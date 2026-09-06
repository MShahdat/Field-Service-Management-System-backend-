import { PaymentStatus } from "../../../../generated/prisma/enums";
import { PaymentWhereInput } from "../../../../generated/prisma/models";
import config from "../../config/env";
import { IQuery, IRequestUser } from "../../interface";
import { getBkashIdToken } from "../../lib/bkash";
import { transporter } from "../../lib/nodemailer";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/appError";
import { IPaymentPayload } from "./payment.interface";
import httpStatus from "http-status";
import PDFDocument from "pdfkit";

//& CREATE PAYMENT
const createPayment = async (payload: IPaymentPayload, user: IRequestUser) => {
	const isCustomer = await prisma.customerProfile.findUnique({
		where: {
			userId: user.userId,
		},
		include: {
			user: true,
		},
	});

	if (!isCustomer) {
		throw new AppError(httpStatus.NOT_FOUND, "customer not found");
	}

	const isWorkOrder = await prisma.workOrder.findUnique({
		where: {
			id: payload.workOrderId,
			customerId: isCustomer.id,
		},
		include: {
			service: true,
			payment: true,
		},
	});

	if (!isWorkOrder) {
		throw new AppError(httpStatus.NOT_FOUND, "order not found");
	}

	if (isWorkOrder.payment?.status === "PAID") {
		throw new AppError(httpStatus.CONFLICT, "you already completed payment");
	}

	if (
		isWorkOrder.service.status === "REJECTED" ||
		isWorkOrder.service.status === "CANCELLED" ||
		isWorkOrder.service.status === "PENDING"
	) {
		throw new AppError(
			httpStatus.CONFLICT,
			`your service is ${isWorkOrder.service.status.toString()}`,
		);
	}

	if (isWorkOrder.service.status !== "COMPLETED") {
		throw new AppError(
			httpStatus.CONFLICT,
			"you can not payment before completed work",
		);
	}

	if (isWorkOrder.status === "CANCELLED") {
		throw new AppError(httpStatus.CONFLICT, "Yur order is cancelled");
	}

	if (isWorkOrder.status !== "COMPLETED") {
		throw new AppError(
			httpStatus.CONFLICT,
			"Work is not completed. so you can not payemnt before completed",
		);
	}

	//* create bkash payment url
	const amount = isWorkOrder.payment?.amount.toString();

	const id_token = await getBkashIdToken();

	if (!id_token) {
		throw new AppError(httpStatus.BAD_GATEWAY, "bkash id token faild");
	}

	const createPayment = await fetch(
		`${config.bkash_base_url}/tokenized/checkout/create`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				authorization: id_token,
				"x-app-key": config.bkash_app_key,
			},
			body: JSON.stringify({
				agreementID: "TokenizedMerchant01L3IKB6H1565072174986",
				mode: "0011",
				payerReference: isCustomer.user.email,
				callbackURL: `${config.bkash_callback_url}/payment/service/callback`,
				merchantAssociationInfo: "MI05MID54RF09123456One",
				amount: amount,
				currency: "BDT",
				intent: "sale",
				merchantInvoiceNumber: isWorkOrder.id,
			}),
		},
	);
	const result = await createPayment.json();
	console.log("result ", result.bkashURL);

	await prisma.payment.update({
		where: {
			workOrderId: isWorkOrder.id,
		},
		data: {
			paymentId: result.paymentID,
			getwayResponse: result,
		},
	});

	return result;
};

//& BKASH CALLBACK
const bkashCallback = async (query: Record<string, any>) => {
	const transactionResult = await prisma.$transaction(
		async (tx) => {
			const id_token = await getBkashIdToken();

			if (!id_token) {
				throw new AppError(httpStatus.BAD_GATEWAY, "bkash id token failed");
			}
			const paymentID = query.paymentID;
			const status = query.status;

			console.log({
				"payment id": paymentID,
				status: status,
			});

			if (!paymentID) {
				throw new AppError(httpStatus.BAD_REQUEST, "Payment id missing");
			}

			if (!status) {
				throw new AppError(httpStatus.BAD_REQUEST, "status is missing");
			}
			if (status === "failure" || status === "cancel") {
				await tx.payment.update({
					where: {
						paymentId: paymentID,
					},
					data: {
						status:
							status === "failure"
								? PaymentStatus.FAILED
								: PaymentStatus.CANCELLED,
						getwayResponse: { statusCode: status },
					},
				});
				return {
					redirectUrl: `${config.frontend_url}/dashboard/my-service?status=${status}`,
				};
			}
			if (status === "success") {
				const executePayment = await fetch(
					`${config.bkash_base_url}/tokenized/checkout/execute`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Accept: "application/json",
							authorization: id_token,
							"x-app-key": config.bkash_app_key,
						},
						body: JSON.stringify({ paymentID }),
					},
				);
				const result = await executePayment.json();
				console.log("execute payment", result);

				const workOrder = await tx.workOrder.findUnique({
					where: {
						id: result.merchantInvoiceNumber,
					},
					include: {
						service: {
							select: {
								customer: {
									select: {
										user: true,
									},
								},
							},
						},
						technician: {
							include: {
								user: true,
							},
						},
						manager: {
							include: {
								user: true,
							},
						},
						payment: true,
					},
				});
				if (!workOrder) {
					throw new AppError(httpStatus.NOT_FOUND, "work order not found");
				}

				await tx.payment.update({
					where: {
						paymentId: paymentID,
					},
					data: {
						paymentId: result.paymentID,
						status: "PAID",
						paidAt: new Date(),
						getwayResponse: result,
						transectionId: result.trxID,
					},
				});

				const doc = new PDFDocument({ margin: 50 });

				const pdfChunks: Buffer[] = [];

				doc.on("data", (chunk: Buffer) => {
					pdfChunks.push(chunk);
				});

				const pdfReadyPromise = new Promise<Buffer>((resolve) => {
					doc.on("end", () => {
						resolve(Buffer.concat(pdfChunks));
					});
				});

				doc
					.fontSize(20)
					.text("Field Service Management System", { align: "center" });
				doc.fontSize(14).text("Payment Invoice", { align: "center" });
				doc.moveDown(2);

				doc
					.fontSize(12)
					.text(`Customer Name: ${workOrder.service.customer.user.name}`);
				doc.text(`Customer Email: ${workOrder.service.customer.user.email}`);
				doc.moveDown();

				doc.text(`Servicing date ${workOrder.servicingDate.toString()}`);

				doc.text(`Technician Name: ${workOrder.technician?.user.name}`);
				doc.text(`Technician Rating: ${workOrder.technician?.rating}`);
				doc.text(
					`Technician Completed Jobs: ${workOrder.technician?.jobsCompleted}`,
				);
				doc.text(`Technician Phone: ${workOrder.technician?.phone}`);
				doc.moveDown();

				doc.text(`Manager Name: ${workOrder.manager?.user.name}`);
				doc.text(`Manager Phone: ${workOrder.manager.phone}`);

				doc.moveDown();

				doc.text(`Amount Paid: ${result.amount}`);
				doc.text(`Payment Method : bKash`);
				doc.text(`TransectionId : ${result.trxID}`);
				doc.text(`Paid At : ${result.paymentExecuteTime}`);
				doc.moveDown();

				doc.end();

				const pdfBuffer = await pdfReadyPromise;

				await transporter.sendMail({
					from: config.smtp_sender,
					to: workOrder.service.customer.user.email,
					subject:
						"Your Service Payment Invoice - Field Service Management System",
					text: "your payment is completed",
					attachments: [
						{
							filename: "invoice.pdf",
							content: pdfBuffer,
						},
					],
				});

				return {
					result,
					redirectUrl: `${config.frontend_url}/dashboard/my-workorder?status=success`,
				};
			} else {
				throw new AppError(httpStatus.BAD_REQUEST, "bkash callback error!");
			}
		},
		{
			maxWait: 10000,
			timeout: 15000,
		},
	);
	return transactionResult;
};

//& GET MY PAYMENT (CUSTOMER)
const getMyPayment = async (query: IQuery, user: IRequestUser) => {
	const sort = query.sortBy ? query.sortBy : "createdAt";
	const order = query.sortOrder ? query.sortOrder : "desc";
	const page = Number(query.page || 1);
	const limit = Number(query.limit || 9);

	const isCustomer = await prisma.customerProfile.findUnique({
		where: {
			userId: user.userId,
		},
	});

	if (!isCustomer) {
		throw new AppError(httpStatus.NOT_FOUND, "patient not found");
	}

	const andCondition: PaymentWhereInput[] = [
		{
			workOrder: {
				customer: {
					userId: user.userId,
				},
			},
		},
	];

	//* searching
	if (query.search) {
		andCondition.push({
			OR: [
				{
					workOrder: {
						technician: {
							user: {
								name: {
									contains: query.search,
									mode: "insensitive",
								},
							},
						},
					},
				},
				{
					workOrder: {
						manager: {
							user: {
								name: {
									contains: query.search,
									mode: "insensitive",
								},
							},
						},
					},
				},
			],
		});
	}

	//* filtering
	if (query.status) {
		andCondition.push({
			status: query.status,
		});
	}

	const payment = await prisma.payment.findMany({
		where: {
			AND: andCondition,
		},
		take: limit,
		skip: (page - 1) * limit,

		orderBy: {
			[sort]: order,
		},
		omit: {
			getwayResponse: true,
		},
	});

	const total = await prisma.payment.count({
		where: {
			AND: andCondition,
		},
	});

	const meta = {
		total,
		page,
		limit,
		totalPages: Math.ceil(total / limit),
	};

	return {
		payment,
		meta,
	};
};

//& GET MY PAYMENT (TECHNICIAN)
const getTechnicianPayment = async (query: IQuery, user: IRequestUser) => {
	const sort = query.sortBy ? query.sortBy : "createdAt";
	const order = query.sortOrder ? query.sortOrder : "desc";
	const page = Number(query.page || 1);
	const limit = Number(query.limit || 9);

	const isTech = await prisma.technicianProfile.findUnique({
		where: {
			userId: user.userId,
		},
	});

	if (!isTech) {
		throw new AppError(httpStatus.NOT_FOUND, "technician not found");
	}

	const andCondition: PaymentWhereInput[] = [
		{
			workOrder: {
				technician: {
					userId: user.userId,
				},
			},
		},
	];

	//* searching
	if (query.search) {
		andCondition.push({
			OR: [
				{
					workOrder: {
						customer: {
							user: {
								name: {
									contains: query.search,
									mode: "insensitive",
								},
							},
						},
					},
				},
				{
					workOrder: {
						manager: {
							user: {
								name: {
									contains: query.search,
									mode: "insensitive",
								},
							},
						},
					},
				},
			],
		});
	}

	//* filtering
	if (query.status) {
		andCondition.push({
			status: query.status,
		});
	}

	const payment = await prisma.payment.findMany({
		where: {
			AND: andCondition,
		},
		take: limit,
		skip: (page - 1) * limit,

		orderBy: {
			[sort]: order,
		},
		omit: {
			getwayResponse: true,
		},
	});

	const total = await prisma.payment.count({
		where: {
			AND: andCondition,
		},
	});

	const meta = {
		total,
		page,
		limit,
		totalPages: Math.ceil(total / limit),
	};

	return {
		payment,
		meta,
	};
};

//& GET MY PAYMENT (MANAGER)
const getManagerPayment = async (query: IQuery, user: IRequestUser) => {
	const sort = query.sortBy ? query.sortBy : "createdAt";
	const order = query.sortOrder ? query.sortOrder : "desc";
	const page = Number(query.page || 1);
	const limit = Number(query.limit || 9);

	const isManager = await prisma.managerProfile.findUnique({
		where: {
			userId: user.userId,
		},
	});

	if (!isManager) {
		throw new AppError(httpStatus.NOT_FOUND, "Manager not found");
	}

	const andCondition: PaymentWhereInput[] = [
		{
			workOrder: {
				manager: {
					userId: user.userId,
				},
			},
		},
	];

	//* searching
	if (query.search) {
		andCondition.push({
			OR: [
				{
					workOrder: {
						customer: {
							user: {
								name: {
									contains: query.search,
									mode: "insensitive",
								},
							},
						},
					},
				},
				{
					workOrder: {
						technician: {
							user: {
								name: {
									contains: query.search,
									mode: "insensitive",
								},
							},
						},
					},
				},
			],
		});
	}

	//* filtering
	if (query.status) {
		andCondition.push({
			status: query.status,
		});
	}

	const payment = await prisma.payment.findMany({
		where: {
			AND: andCondition,
		},
		take: limit,
		skip: (page - 1) * limit,

		orderBy: {
			[sort]: order,
		},
		omit: {
			getwayResponse: true,
		},
	});

	const total = await prisma.payment.count({
		where: {
			AND: andCondition,
		},
	});

	const meta = {
		total,
		page,
		limit,
		totalPages: Math.ceil(total / limit),
	};

	return {
		payment,
		meta,
	};
};

//& GET ALL PAYMENT (ADMIN)
const getAllPayments = async (query: IQuery) => {
	const sort = query.sortBy ? query.sortBy : "createdAt";
	const order = query.sortOrder ? query.sortOrder : "desc";
	const page = Number(query.page || 1);
	const limit = Number(query.limit || 9);

	const andCondition: PaymentWhereInput[] = [];

	//* searching
	if (query.search) {
		andCondition.push({
			OR: [
				{
					workOrder: {
						technician: {
							user: {
								name: {
									contains: query.search,
									mode: "insensitive",
								},
							},
						},
					},
				},
				{
					workOrder: {
						manager: {
							user: {
								name: {
									contains: query.search,
									mode: "insensitive",
								},
							},
						},
					},
				},
				{
					workOrder: {
						customer: {
							user: {
								name: {
									contains: query.search,
									mode: "insensitive",
								},
							},
						},
					},
				},
			],
		});
	}

	//* filtering
	if (query.status) {
		andCondition.push({
			status: query.status,
		});
	}

	if (query.workOrderId) {
		andCondition.push({
			workOrderId: query.workOrderId,
		});
	}

	const payment = await prisma.payment.findMany({
		where: {
			AND: andCondition,
		},
		take: limit,
		skip: (page - 1) * limit,

		orderBy: {
			[sort]: order,
		},
		omit: {
			getwayResponse: true,
		},
		include: {
			workOrder: {
				include: {
					customer: true,
					technician: true,
					manager: true,
				},
			},
		},
	});

	const total = await prisma.payment.count({
		where: {
			AND: andCondition,
		},
	});

	const meta = {
		total,
		page,
		limit,
		totalPages: Math.ceil(total / limit),
	};

	return {
		payment,
		meta,
	};
};

export const paymentService = {
	createPayment,
	bkashCallback,
	getMyPayment,
	getTechnicianPayment,
	getAllPayments,
	getManagerPayment,
};
