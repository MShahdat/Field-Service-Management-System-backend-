import {
	addMinutes,
	areIntervalsOverlapping,
	getDay,
	isWithinInterval,
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
import { parseTimeOnDate } from "../../utils/utility";

const toDateKey = (date: Date) => date.toISOString().slice(0, 10);


const timeToDate = (time?: string) =>
	time ? new Date(`1970-01-01T${time}:00.000Z`) : undefined;

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
		throw new AppError(
			httpStatus.INTERNAL_SERVER_ERROR,
			"Something went wrong",
		);
	}

	const service = await prisma.service.create({
		data: {
			description: payload.description,
			servicingDate: new Date(payload.servicingDate),
			address: payload.address,
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

	return service;
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
		services,
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
		services,
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

	return isService;
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

	if (isManager.isDeleted) {
		throw new AppError(httpStatus.FORBIDDEN, "Manager is deleted");
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
	return transactionResult;
};

//& ELIGIBLE TECHNICIAN
const getEligibleTechnicians = async (workOrderId: string) => {
	const isWorkOrder = await prisma.workOrder.findUnique({
		where: {
			id: workOrderId,
		},
		include: {
			service: {
				include: {
					category: {
						select: {
							id: true,
							duration: true,
							name: true,
						},
					},
				},
			},
			region: {
				select: {
					id: true,
					area: true,
				},
			},
		},
	});

	if (!isWorkOrder) {
		throw new AppError(httpStatus.NOT_FOUND, "WorkOrder not found");
	}

	if (isWorkOrder.status !== "SCHEDULED") {
		throw new AppError(httpStatus.CONFLICT, "WorkOrder not schedulable");
	}

	const { service, regionId, servicingDate } = isWorkOrder;

	const serviceDate = new Date(servicingDate);
	const dayOfWeek = getDay(serviceDate);

	const categoryDuration = service.category.duration;
	const preferredStart = service.preferredStartTime
		? new Date(service.preferredStartTime).toISOString().substring(11, 16)
		: "09:00";
	const startTime = parseTimeOnDate(preferredStart, serviceDate);
	const preferredEnd = service.preferredEndTime
		? new Date(service.preferredEndTime).toISOString().substring(11, 16)
		: null;
	const endTime = preferredEnd
		? parseTimeOnDate(preferredEnd, serviceDate)
		: addMinutes(startTime, categoryDuration);

	const candidates = await prisma.technicianProfile.findMany({
		where: {
			status: "AVAILABLE",
			isDeleted: false,
			isProfileCompleted: true,
			regions: {
				some: {
					id: regionId,
				},
			},
			skills: {
				some: {
					categoryId: service.categoryId,
				},
			},
		},
		include: {
			skills: {
				where: {
					categoryId: service.categoryId,
				},
				select: {
					id: true,
					name: true,
				},
			},
			regions: {
				where: {
					id: regionId,
				},
				select: {
					id: true,
					area: true,
				},
			},
			availability: {
				where: {
					isActive: true,
				},
			},
			workOrder: {
				where: {
					status: {
						in: ["SCHEDULED", "EN_ROUTE", "STARTED"],
					},
					NOT: {
						id: workOrderId,
					},
				},
				include: {
					service: {
						select: {
							duration: true,
						},
					},
				},
			},
			user: {
				select: {
					name: true,
					technician: {
						select: {
							phone: true,
						},
					},
				},
			},
		},
	});

	if (candidates.length === 0) {
		throw new AppError(httpStatus.NOT_FOUND, "no technicians found");
	}
	// console.log(candidates)

	const eligible = candidates.filter((tech) => {
		const serviceDay = serviceDate;

		const isBlocked = tech.availability.some((slot) => {
			return (
				slot.type === "BLOCKED" &&
				!!slot.date &&
				toDateKey(slot.date) === toDateKey(serviceDate)
			);
		});
		if (isBlocked) {
			return false;
		}

		const hasAvailable = tech.availability.some((slot) => {
			if (slot.type === "BLOCKED") {
				return false;
			}

			const slotStart = slot.startTime
				? parseTimeOnDate(
						new Date(slot.startTime).toISOString().substring(11, 16),
						serviceDay,
					)
				: null;

			const slotEnd = slot.endTime
				? parseTimeOnDate(
						new Date(slot.endTime).toISOString().substring(11, 16),
						serviceDay,
					)
				: null;

			if (!slotStart || !slotEnd) {
				return false;
			}

			let coversDate = false;
			if (slot.type === "RECURRING") {
				coversDate = slot.dayOfWeek === dayOfWeek;
			} else if (slot.type === "ONE_OFF" && slot.date) {
				coversDate = toDateKey(slot.date) === toDateKey(serviceDay);
			}

			if (!coversDate) {
				return false;
			}

			return (
				isWithinInterval(startTime, { start: slotStart, end: slotEnd }) &&
				isWithinInterval(endTime, { start: slotStart, end: slotEnd })
			);
		});
		if (!hasAvailable) {
			return false;
		}

		const hasTimeConflict = tech.workOrder.some((wo) => {
			const woStart = new Date(wo.servicingDate);
			const woDuration = wo.service?.duration || categoryDuration;
			const woEnd = addMinutes(woStart, woDuration);
			return areIntervalsOverlapping(
				{
					start: startTime,
					end: endTime,
				},
				{
					start: woStart,
					end: woEnd,
				},
			);
		});
		if (hasTimeConflict) {
			return false;
		}

		return true;
	});

	eligible.sort(
		(a, b) =>
			(b.rating ?? 0) - (a.rating ?? 0) || a.jobsCompleted - b.jobsCompleted,
	);

	return eligible.map((tech) => ({
		id: tech.id,
		name: tech.user.name,
		phone: tech.phone,
		rating: tech.rating,
		jobsCompleted: tech.jobsCompleted,
		skills: tech.skills,
		regions: tech.regions,
		availability: tech.availability
			.filter((slot) => slot.isActive)
			.map((slot) => ({
				type: slot.type,
				dayOfWeek: slot.dayOfWeek ?? undefined,
				date: slot.date ?? undefined,
				startTime: slot.startTime
					? new Date(slot.startTime).toISOString().substring(11, 16)
					: "00:00",
				endTime: slot.endTime
					? new Date(slot.endTime).toISOString().substring(11, 16)
					: "23:59",
			})),
	}));
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

	const isWorkOrder = await prisma.workOrder.findUnique({
		where: {
			id: payload.workOrderId,
		},
		include: {
			region: {
				select: {
					area: true,
				},
			},
		},
	});

	if (!isWorkOrder) {
		throw new AppError(httpStatus.NOT_FOUND, "order not found");
	}

	const sameRegionTech = await prisma.technicianProfile.findMany({
		where: {},
		include: {
			regions: {
				select: {
					area: true,
				},
			},
		},
	});

	console.log("all technician for same region ", sameRegionTech);
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
