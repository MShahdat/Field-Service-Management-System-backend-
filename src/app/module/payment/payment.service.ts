import { PaymentStatus } from "../../../../generated/prisma/enums";
import config from "../../config/env";
import { IRequestUser } from "../../interface";
import { getBkashIdToken } from "../../lib/bkash";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/appError";
import { IPaymentPayload } from "./payment.interface";
import httpStatus from "http-status";

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
						gatewayResponse: { statusCode: status },
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

				// const workOrder = await tx.workOrder.findUnique({
				//   where: {
				//     id: result.merchantInvoiceNumber
				//   }
				// })
				// if(!workOrder){
				//   throw new AppError(httpStatus.NOT_FOUND, 'work order not found')
				// }

				await tx.payment.update({
					where: {
						paymentId: paymentID,
					},
					data: {
						paymentId: result.paymentID,
						status: "PAID",
						paidAt: result.paymentExecuteTime.toIOSString(),
						getwayResponse: result,
						transectionId: result.trxID,
					},
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

export const paymentService = {
	createPayment,
	bkashCallback,
};
