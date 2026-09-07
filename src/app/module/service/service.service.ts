import {
	addMinutes,
	endOfDay,
	getDay,
	isBefore,
	isWithinInterval,
	startOfDay,
} from "date-fns";
import {
	ManagerVerificationStatus,
	UserRole,
} from "../../../../generated/prisma/enums";
import { ServiceWhereInput } from "../../../../generated/prisma/models";
import { IQuery, IRequestUser } from "../../interface";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/appError";
import {
	IAssignTechnician,
	IReviewPayload,
	IServicePayload,
} from "./service.interface";
import httpStatus from "http-status";
import {
	formatDateToYYYYMMDD,
	formatTimeToHHmm,
	parseTimeOnDate,
} from "../../utils/utility";
import path from "path";
import config from "../../config/env";
import ejs from "ejs";
import { transporter } from "../../lib/nodemailer";
import { getBkashIdToken } from "../../lib/bkash";

const toDateKey = (date: Date) => {
	const d = new Date(date);
	const year = d.getFullYear();
	const month = String(d.getMonth() + 1).padStart(2, "0");
	const day = String(d.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
};

const timeToDate = (time?: string) =>
	time ? new Date(`1970-01-01T${time}:00.000Z`) : undefined;

const formatServiceDates = <
	T extends {
		servicingDate: Date;
		preferredStartTime: Date | null;
		preferredEndTime: Date | null;
	},
>(
	service: T,
) => ({
	...service,
	servicingDate: formatDateToYYYYMMDD(service.servicingDate),
	preferredStartTime: formatTimeToHHmm(service.preferredStartTime),
	preferredEndTime: formatTimeToHHmm(service.preferredEndTime),
});

const formatTechnicianResponse = <
	T extends {
		id: string;
		userId: string;
		rating: number | null;
		jobsCompleted: number;
		user: { name: string; email: string };
		phone: string | null;
		skills: { id: string; name: string }[];
		regions: { id: string; area: string }[];
		availability?: unknown[];
	},
>(
	technician: T,
) => ({
	id: technician.id,
	userId: technician.userId,
	rating: technician.rating,
	jobsCompleted: technician.jobsCompleted,
	user: technician.user,
	phone: technician.phone,
	skills: technician.skills,
	regions: technician.regions,
});

//& CREATE SERVICE REQUEST
const createService = async (payload: IServicePayload, user: IRequestUser) => {
	const isCustomer = await prisma.user.findUnique({
		where: {
			id: user.userId,
			role: UserRole.CUSTOMER,
		},
		select: {
			customer: {
				select: {
					id: true,
				},
			},
		},
	});

	if (!isCustomer?.customer?.id) {
		throw new AppError(httpStatus.NOT_FOUND, "customer not found");
	}

	const category = await prisma.category.findUnique({
		where: {
			id: payload.categoryId,
		},
	});

	if (!category) {
		throw new AppError(httpStatus.NOT_FOUND, "this category not found");
	}

	const now = new Date();
	console.log({
		now,
		serviceing: payload.servicingDate,
	});

	if (isBefore(payload.servicingDate, now)) {
		throw new AppError(
			httpStatus.BAD_REQUEST,
			"serviceing date can not be before current date",
		);
	}

	const service = await prisma.service.create({
		data: {
			description: payload.description,
			servicingDate: payload.servicingDate,
			address: payload.address,
			duration: category.duration,
			categoryId: payload.categoryId,
			priority: payload.priority,
			regionId: payload.regionId,
			preferredStartTime: timeToDate(payload.preferredStartTime),
			preferredEndTime: timeToDate(payload.preferredEndTime),
			customerId: isCustomer.customer?.id,
		},
		include: {
			customer: true,
		},
	});

	return formatServiceDates(service);
};

//& GET MY SERVICES
const getMyServices = async (query: IQuery, user: IRequestUser) => {
	const sort = query.sortBy ? query.sortBy : "createdAt";
	const order = query.sortOrder ? query.sortOrder : "desc";
	const page = Number(query.page || 1);
	const limit = Number(query.limit || 9);

	const customer = await prisma.customerProfile.findUnique({
		where: {
			userId: user.userId,
		},
	});

	if (!customer) {
		throw new AppError(httpStatus.NOT_FOUND, "customer not found");
	}

	const andCondition: ServiceWhereInput[] = [
		{
			customerId: customer.id,
		},
	];

	if (query.status) {
		andCondition.push({
			status: query.status,
		});
	}

	if (query.priority) {
		andCondition.push({
			priority: query.priority,
		});
	}

	const services = await prisma.service.findMany({
		where: {
			AND: andCondition,
		},

		take: limit,
		skip: (page - 1) * limit,

		orderBy: {
			[sort]: order,
		},
		include: {
			workOrders: true,
		},
	});

	const total = await prisma.service.count({
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
		services: services.map(formatServiceDates),
		meta,
	};
};

//& GET ALL SERVICES
const getALLServices = async (query: IQuery, user: IRequestUser) => {
	const sort = query.sortBy ? query.sortBy : "createdAt";
	const order = query.sortOrder ? query.sortOrder : "desc";
	const page = Number(query.page || 1);
	const limit = Number(query.limit || 9);

	const isUser = await prisma.user.findUnique({
		where: {
			id: user.userId,
		},
	});

	if (!isUser) {
		throw new AppError(httpStatus.NOT_FOUND, "user not found");
	}

	const andCondition: ServiceWhereInput[] = [];

	if (query.status) {
		andCondition.push({
			status: query.status,
		});
	}

	if (query.priority) {
		andCondition.push({
			priority: query.priority,
		});
	}

	const services = await prisma.service.findMany({
		where: {
			AND: andCondition,
		},

		take: limit,
		skip: (page - 1) * limit,

		orderBy: {
			[sort]: order,
		},
		include: {
			workOrders: true,
		},
	});

	const total = await prisma.service.count({
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
		services: services.map(formatServiceDates),
		meta,
	};
};

//& GET SINGLE SERVICE
const getSingleService = async (serviceId: string, user: IRequestUser) => {
	const isUser = await prisma.user.findUnique({
		where: {
			id: user.userId,
		},
		include: {
			customer: true,
			manager: true,
		},
	});

	if (!isUser) {
		throw new AppError(httpStatus.NOT_FOUND, "user not found");
	}

	const isService = await prisma.service.findUnique({
		where: {
			id: serviceId,
		},
		include: {
			workOrders: true,
		},
	});

	if (!isService) {
		throw new AppError(httpStatus.NOT_FOUND, "service not found");
	}

	if (user.role === "CUSTOMER") {
		if (isService.customerId !== isUser.customer?.id) {
			throw new AppError(httpStatus.UNAUTHORIZED, "unauthorized access");
		}
	}

	return formatServiceDates(isService);
};

//& APPROVE SERVICE (MANAGER)
const reviewService = async (
	payload: IReviewPayload,
	reviewer: IRequestUser,
) => {
	const { serviceId, status, rejectionReason } = payload;

	const isManager = await prisma.managerProfile.findUnique({
		where: {
			userId: reviewer.userId,
		},
		include: {
			region: {
				select: {
					id: true,
					area: true,
				},
			},
		},
	});

	if (!isManager) {
		throw new AppError(httpStatus.NOT_FOUND, "Manager not found");
	}

	if (isManager.isDeleted) {
		throw new AppError(httpStatus.BAD_REQUEST, "Manager deleted");
	}

	if (isManager.verificationStatus !== ManagerVerificationStatus.APPROVED) {
		throw new AppError(httpStatus.BAD_REQUEST, "manager not varified");
	}

	console.log("payload ", payload);

	const isService = await prisma.service.findUnique({
		where: {
			id: serviceId,
		},
	});

	if (!isService) {
		throw new AppError(httpStatus.NOT_FOUND, "service not found");
	}

	const canReviewAnyService = isManager.region.some(
		(region) => region.area === "All",
	);
	const canReviewService =
		canReviewAnyService ||
		isManager.region.some((region) => region.id === isService.regionId);

	if (!canReviewService) {
		throw new AppError(
			httpStatus.FORBIDDEN,
			"You can only review services in your assigned regions",
		);
	}

	if (isService.status !== "PENDING") {
		throw new AppError(
			httpStatus.CONFLICT,
			`you can't update varification status from  '${isService.status.toString()}'.`,
		);
	}

	if (status === "REJECTED" && !rejectionReason) {
		throw new AppError(
			httpStatus.BAD_REQUEST,
			"for rejection must need to rejection reason",
		);
	}

	const transactionResult = await prisma.$transaction(
		async (tx) => {
			await tx.service.update({
				where: {
					id: isService.id,
				},
				data: {
					status,
					rejectionReason: status === "REJECTED" ? rejectionReason : null,
					reviewedBy: reviewer.userId,
					reviewedAt: new Date(),
				},
			});

			if (status === "APPROVED") {
				await tx.workOrder.create({
					data: {
						servicingDate: isService.servicingDate,
						customerId: isService.customerId,
						serviceId: isService.id,
						status: "SCHEDULED",
						regionId: isService.regionId,
						managerId: isManager.id,
					},
				});
			}

			const service = await tx.service.findUnique({
				where: {
					id: isService.id,
				},
				include: {
					workOrders: true,
				},
			});
			return service;
		},
		{
			maxWait: 10000,
			timeout: 15000,
		},
	);
	return transactionResult
		? formatServiceDates(transactionResult)
		: transactionResult;
};

//& ELIGIBLE TECHNICIAN
const getEligibleTechnicians = async (workOrderId: string) => {
	const workOrder = await prisma.workOrder.findUnique({
		where: {
			id: workOrderId,
		},
		include: {
			service: {
				include: {
					category: true,
				},
			},
			region: true,
		},
	});

	if (!workOrder) {
		throw new AppError(httpStatus.NOT_FOUND, "Work order not found");
	}

	const serviceDate = new Date(workOrder.servicingDate);
	const startTime = workOrder.service.preferredStartTime
		? parseTimeOnDate(workOrder.service.preferredStartTime, serviceDate)
		: new Date(serviceDate);
	const endTime = workOrder.service.preferredEndTime
		? parseTimeOnDate(workOrder.service.preferredEndTime, serviceDate)
		: addMinutes(startTime, workOrder.service.category.duration ?? 60);

	const startOfService = new Date(serviceDate);
	startOfService.setHours(9, 0, 0, 0);

	const candidates = await prisma.technicianProfile.findMany({
		where: {
			status: "AVAILABLE",
			isDeleted: false,
			isProfileCompleted: true,
			regions: {
				some: { id: workOrder.regionId },
			},
			skills: {
				some: { categoryId: workOrder.service.categoryId },
			},
		},
		select: {
			id: true,
			userId: true,
			rating: true,
			jobsCompleted: true,
			user: { select: { name: true, email: true } },
			phone: true,
			skills: {
				where: { categoryId: workOrder.service.categoryId },
				select: { id: true, name: true },
			},
			regions: {
				where: { id: workOrder.regionId },
				select: { id: true, area: true },
			},
			availability: { where: { isActive: true } },
		},
	});

	if (candidates.length === 0) {
		throw new AppError(httpStatus.NOT_FOUND, "No eligible technicians found");
	}

	const techIds = candidates.map((t) => t.id);
	const scheduleConflicts = await prisma.schedule.findMany({
		where: {
			technicianId: { in: techIds },
			servicingDate: {
				gte: startOfDay(serviceDate),
				lte: endOfDay(serviceDate),
			},
			status: { in: ["SCHEDULED", "CONFIRMED"] },
			OR: [{ startTime: { lt: endTime }, endTime: { gt: startTime } }],
		},
		select: { technicianId: true },
	});
	const conflictedTechIds = new Set(
		scheduleConflicts.map((c) => c.technicianId),
	);

	const eligible = candidates.filter((tech) => {
		if (conflictedTechIds.has(tech.id)) return false;

		const isBlocked = tech.availability.some(
			(slot) =>
				slot.type === "BLOCKED" &&
				slot.date &&
				toDateKey(slot.date) === toDateKey(serviceDate),
		);
		if (isBlocked) return false;

		const hasAvailability = tech.availability.some((slot) => {
			if (slot.type === "BLOCKED") return false;
			const slotStart = slot.startTime
				? parseTimeOnDate(slot.startTime, serviceDate)
				: null;
			const slotEnd = slot.endTime
				? parseTimeOnDate(slot.endTime, serviceDate)
				: null;
			if (!slotStart || !slotEnd) return false;

			let coversDate = false;
			if (slot.type === "RECURRING")
				coversDate = slot.dayOfWeek === getDay(serviceDate);
			else if (slot.type === "ONE_OFF" && slot.date)
				coversDate = toDateKey(slot.date) === toDateKey(serviceDate);
			if (!coversDate) return false;

			return (
				isWithinInterval(startTime, { start: slotStart, end: slotEnd }) &&
				isWithinInterval(endTime, { start: slotStart, end: slotEnd })
			);
		});

		return hasAvailability;
	});

	eligible.sort(
		(a, b) =>
			(b.rating ?? 0) - (a.rating ?? 0) || a.jobsCompleted - b.jobsCompleted,
	);

	return eligible.map(formatTechnicianResponse);
};

//& ASSIGN TECHNICIAN
const assignTechnician = async (
	payload: IAssignTechnician,
	user: IRequestUser,
) => {
	const isManager = await prisma.managerProfile.findUnique({
		where: {
			userId: user.userId,
		},
	});

	if (!isManager) {
		throw new AppError(httpStatus.NOT_FOUND, "Manager not found");
	}

	const isTechnician = await prisma.technicianProfile.findUnique({
		where: {
			id: payload.technicianId,
		},
		include: {
			user: true,
		},
	});

	if (!isTechnician) {
		throw new AppError(httpStatus.NOT_FOUND, "technician not found");
	}

	if (isTechnician.status !== "AVAILABLE") {
		throw new AppError(httpStatus.CONFLICT, "technician no longer available");
	}

	const isWorkOrder = await prisma.workOrder.findUnique({
		where: {
			id: payload.workOrderId,
		},
		include: {
			service: {
				include: {
					category: true,
				},
			},
			customer: {
				select: {
					user: true,
				},
			},
		},
	});

	if (!isWorkOrder) {
		throw new AppError(httpStatus.NOT_FOUND, "order not found");
	}

	if (isWorkOrder.status !== "SCHEDULED") {
		throw new AppError(
			httpStatus.BAD_REQUEST,
			`Status need to must be scheduled`,
		);
	}

	if (isWorkOrder.service.status !== "APPROVED") {
		throw new AppError(httpStatus.BAD_REQUEST, "service status not approved");
	}

	if (isWorkOrder.managerId !== isManager.id) {
		throw new AppError(
			httpStatus.UNAUTHORIZED,
			"you are not eligible to assign technician",
		);
	}

	const serviceDate = new Date(isWorkOrder.servicingDate);
	const startTime = isWorkOrder.service.preferredStartTime
		? parseTimeOnDate(isWorkOrder.service.preferredStartTime, serviceDate)
		: new Date(serviceDate);
	const endTime = isWorkOrder.service.preferredEndTime
		? parseTimeOnDate(isWorkOrder.service.preferredEndTime, serviceDate)
		: addMinutes(startTime, isWorkOrder.service.category.duration ?? 60);

	console.log({
		serviceDate,
		startTime,
		endTime,
	});

	const transactionResult = await prisma.$transaction(
		async (tx) => {
			const tech = await tx.technicianProfile.findUnique({
				where: {
					id: payload.technicianId,
				},
			});

			if (!tech) {
				throw new AppError(
					httpStatus.CONFLICT,
					"technician no longer available",
				);
			}

			const conflict = await tx.schedule.findFirst({
				where: {
					technicianId: payload.technicianId,
					servicingDate: {
						gte: startOfDay(isWorkOrder.servicingDate),
						lte: endOfDay(isWorkOrder.servicingDate),
					},
					status: {
						in: ["SCHEDULED", "CONFIRMED"],
					},
					OR: [{ startTime: { lt: endTime }, endTime: { gt: startTime } }],
				},
			});

			if (conflict) {
				throw new AppError(
					httpStatus.CONFLICT,
					"Technician has conflicting schedule",
				);
			}

			await tx.service.update({
				where: {
					id: isWorkOrder.service.id,
				},
				data: {
					status: "ASSIGNED",
					assignedAt: new Date(),
				},
			});

			const workOrder = await tx.workOrder.update({
				where: {
					id: isWorkOrder.id,
				},
				data: {
					status: "EN_ROUTE",
					technicianId: payload.technicianId,
				},
				include: {
					service: {
						include: {
							region: true,
							category: true,
						},
					},
					customer: true,
					technician: {
						include: {
							user: true,
						},
					},
				},
			});

			const scheduleStartTime =
				workOrder.service.preferredStartTime ??
				parseTimeOnDate("09:00", workOrder.servicingDate);
			const scheduleEndTime =
				workOrder.service.preferredEndTime ??
				addMinutes(
					scheduleStartTime,
					workOrder.service.category.duration ?? 60,
				);

			await tx.schedule.create({
				data: {
					workOrderId: payload.workOrderId,
					technicianId: payload.technicianId,
					servicingDate: workOrder.servicingDate,
					startTime: scheduleStartTime,
					endTime: scheduleEndTime,
					status: "CONFIRMED",
				},
			});

			// await tx.technicianProfile.update({
			// 	where: {
			// 		id: payload.technicianId,
			// 	},
			// 	data: {
			// 		status: "BUSY",
			// 	},
			// });

			//* create bkash payment url

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
						payerReference: isWorkOrder.customer.user.email,
						callbackURL: `${config.bkash_callback_url}/payment/service/callback`,
						merchantAssociationInfo: "MI05MID54RF09123456One",
						amount: payload.amount,
						currency: "BDT",
						intent: "sale",
						merchantInvoiceNumber: isWorkOrder.id,
					}),
				},
			);

			const result = await createPayment.json();
			console.log("result ", result.bkashURL);

			await tx.payment.create({
				data: {
					amount: result.amount,
					merchantInvoiceNumber: result.merchantInvoiceNumber,
					status: "UNPAID",
					currency: result.currency,
					getwayResponse: result,
					workOrderId: isWorkOrder.id,
					paymentId: result.paymentID,
					payerReference: isWorkOrder.customer.user.email,
				},
			});

			return workOrder;
		},
		{
			maxWait: 10000,
			timeout: 15000,
		},
	);

	const templatePathTech = path.join(
		process.cwd(),
		"src/app/template/technician-notification.ejs",
	);

	const templateDataTech = {
		name: isTechnician.user.name,
		serviceCategory: isWorkOrder.service.category.name,
		customerName: isWorkOrder.customer.user.name,
		address: isWorkOrder.service.address,
		scheduledDate: isWorkOrder.servicingDate.toLocaleString(),
		notes: isWorkOrder.note ?? null,
		appName: config.app_name,
	};

	const htmlTech = await ejs.renderFile(templatePathTech, templateDataTech);

	await transporter.sendMail({
		from: config.smtp_sender,
		to: isTechnician.user.email,
		subject: `New Job Assigned: ${isWorkOrder.service.category.name} - ${isWorkOrder.id.slice(0, 8)}`,
		html: htmlTech,
	});

	const templatePath = path.join(
		process.cwd(),
		"src/app/template/customer-notification.ejs",
	);

	const templateData = {
		name: isWorkOrder.customer.user.name,
		technicianName: isTechnician.user.name,
		technicianRating: isTechnician.rating,
		jobsCompleted: isTechnician.jobsCompleted,
		technicianPhone: isTechnician.phone ?? null,
		serviceCategory: isWorkOrder.service.category.name,
		serviceId: isWorkOrder.service.id,
		address: isWorkOrder.service.address,
		scheduledDate: isWorkOrder.servicingDate.toLocaleString(),
		appName: config.app_name,
	};

	const html = await ejs.renderFile(templatePath, templateData);

	await transporter.sendMail({
		from: config.smtp_sender,
		to: isWorkOrder.customer.user.email,
		subject: `Technician Assigned: ${isTechnician.user.name}`,
		html,
	});

	return transactionResult;
};

export const serviceService = {
	createService,
	getMyServices,
	getALLServices,
	getSingleService,
	reviewService,
	getEligibleTechnicians,
	assignTechnician,
};
