import { addMinutes, isBefore } from "date-fns";
import {
	ManagerVerificationStatus,
	ScheduleStatus,
	ServiceStatus,
	UserRole,
} from "../../../../generated/prisma/enums";
import { ServiceWhereInput } from "../../../../generated/prisma/models";
import { IQuery, IRequestUser } from "../../interface";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/appError";
import {
	IAssignTechnician,
	IServicePayload,
	IUpdateServicePayload,
} from "./service.interface";
import httpStatus from "http-status";
import {
	formatDateToYYYYMMDD,
	formatTimeToHHmm,
	getUTCDayOfWeek,
	parseTimeOnDate,
	toDateKeyUTC,
	utcDayRange,
} from "../../utils/utility";
import path from "path";
import config from "../../config/env";
import ejs from "ejs";
import { transporter } from "../../lib/nodemailer";
import { getBkashIdToken } from "../../lib/bkash";

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

	const preferredStartTime = timeToDate(payload.preferredStartTime);

	const service = await prisma.service.create({
		data: {
			title: payload.title,
			description: payload.description,
			servicingDate: payload.servicingDate,
			address: payload.address,
			duration: category.duration,
			categoryId: payload.categoryId,
			priority: payload.priority,
			regionId: payload.regionId,
			preferredStartTime,
			preferredEndTime: preferredStartTime
				? addMinutes(preferredStartTime, category.duration)
				: undefined,
			customerId: isCustomer.customer?.id as string,
			workOrders: {
				create: {
					servicingDate: payload.servicingDate,
					customerId: isCustomer.customer?.id as string,
					status: "SCHEDULED",
					regionId: payload.regionId
				}
			}
		},
		include: {
			customer: true,
			workOrders: true
		},
	});

	return {
		...service,
		servicingDate: formatDateToYYYYMMDD(service.servicingDate),
		preferredStartTime: formatTimeToHHmm(service.preferredStartTime),
		preferredEndTime: formatTimeToHHmm(service.preferredEndTime),
	};
};


//& UDPATE SERVICE REQUEST
const updateService = async (id: string, payload: IUpdateServicePayload, user: IRequestUser) => {

	const isService = await prisma.service.findUnique({
		where: {
			id,
			customer: {
				userId: user.userId
			}
		},
	});

	if (!isService) {
		throw new AppError(httpStatus.NOT_FOUND, "service not found");
	}

	if (isService.status !== "PENDING") {
		throw new AppError(httpStatus.BAD_REQUEST, "service cannot be updated");
	}

	let duration = isService.duration;

	if (payload.categoryId) {
		const category = await prisma.category.findUnique({
			where: {
				id: payload.categoryId,
			},
		});

		if (!category) {
			throw new AppError(httpStatus.NOT_FOUND, "this category not found");
		}

		duration = category.duration;
	}


	if (payload.regionId) {
		const region = await prisma.region.findUnique({
			where: {
				id: payload.regionId
			}
		})

		if (!region) {
			throw new AppError(httpStatus.NOT_FOUND, "this region not found");
		}
	}

	const now = new Date();
	console.log({
		now,
		serviceing: payload.servicingDate,
	});


	if (payload.servicingDate && isBefore(payload.servicingDate, now)) {
		throw new AppError(
			httpStatus.BAD_REQUEST,
			"serviceing date can not be before current date",
		);
	}

	const preferredStartTime =
		timeToDate(payload.preferredStartTime) ?? isService.preferredStartTime;

	const updatedService = await prisma.service.update({
		where: {
			id,
		},
		data: {
			description: payload.description,
			servicingDate: payload.servicingDate,
			address: payload.address,
			categoryId: payload.categoryId,
			duration,
			priority: payload.priority,
			regionId: payload.regionId,
			preferredStartTime,
			preferredEndTime: preferredStartTime
				? addMinutes(preferredStartTime, duration ?? 60)
				: undefined,
		},
		include: {
			customer: true,
		},
	});

	return {
		...updatedService,
		servicingDate: formatDateToYYYYMMDD(updatedService.servicingDate),
		preferredStartTime: formatTimeToHHmm(updatedService.preferredStartTime),
		preferredEndTime: formatTimeToHHmm(updatedService.preferredEndTime),
	};
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
		{
			isDeleted: false
		}
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
		select: {
			id: true,
			title: true,
			address: true,
			description: true,
			preferredEndTime: true,
			preferredStartTime: true,
			priority: true,
			rejectionReason: true,
			servicingDate: true,
			status: true,
			workOrders: {
				select: {
					id: true,
					technician: {
						select: {
							user: {
								select: {
									id: true,
									name: true,
									email: true,
									profileImg: true,
									emailVerified: true,
									status: true
								},
							}
						}
					},
				},
			},
			category: {
				select: {
					name: true,
					id: true
				}
			}
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
		data: services.map((s) => ({
			...s,
			servicingDate: formatDateToYYYYMMDD(s.servicingDate),
			preferredStartTime: formatTimeToHHmm(s.preferredStartTime),
			preferredEndTime: formatTimeToHHmm(s.preferredEndTime),
		})),
		meta,
	};
};

//& GET ALL SERVICES (ADMIN)
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
			category: true,
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
		data: services.map((s) => ({
			...s,
			servicingDate: formatDateToYYYYMMDD(s.servicingDate),
			preferredStartTime: formatTimeToHHmm(s.preferredStartTime),
			preferredEndTime: formatTimeToHHmm(s.preferredEndTime),
		})),
		meta,
	};
};


//& GET MY REGION SERVICES (MANAGER)
const getMyRegionServices = async (query: IQuery, user: IRequestUser) => {
	const sort = query.sortBy ? query.sortBy : "createdAt";
	const order = query.sortOrder ? query.sortOrder : "desc";
	const page = Number(query.page || 1);
	const limit = Number(query.limit || 9);

	const isManager = await prisma.managerProfile.findUnique({
		where: {
			userId: user.userId
		},
		include: {
			region: true
		}
	});

	if (!isManager) {
		throw new AppError(httpStatus.NOT_FOUND, "manager not found");
	}

	const managerRegionIds = isManager.region.map((r) => r.id);
	const allowStatus: ServiceStatus[] = ["APPROVED", "ASSIGNED", "COMPLETED", "IN_PROGRESS", "PENDING"];

	const andCondition: ServiceWhereInput[] = [
		{ regionId: { in: managerRegionIds } },
		{ status: { in: allowStatus } },
		{ isDeleted: false }
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
			customer: {
				select: {
					user: {
						omit: {
							password: true
						}
					}
				}
			},
			category: true,
			workOrders: true
		}
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
		data: services.map((s) => ({
			...s,
			servicingDate: formatDateToYYYYMMDD(s.servicingDate),
			preferredStartTime: formatTimeToHHmm(s.preferredStartTime),
			preferredEndTime: formatTimeToHHmm(s.preferredEndTime),
		})),
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
			region: true,
			customer: {
				select: {
					user: {
						omit: {
							password: true
						}
					}
				}
			},
			workOrders: {
				include: {
					payment: {
						omit: {
							getwayResponse: true
						}
					},
					manager: {
						include: {
							user: {
								omit: {
									password: true
								}
							}
						}
					},
					feedback: true,
					attachment: true,
					schedule: true,
					technician: {
						include: {
							user: {
								omit: {
									password: true
								}
							}
						}
					},
					serviceReport: true,
				}
			},
			category: true,
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

	return {
		...isService,
		servicingDate: formatDateToYYYYMMDD(isService.servicingDate),
		preferredStartTime: formatTimeToHHmm(isService.preferredStartTime),
		preferredEndTime: formatTimeToHHmm(isService.preferredEndTime),
	};
};

//& REVIAEW (MANAGER)

// const reviewService = async (
// 	payload: IReviewPayload,
// 	reviewer: IRequestUser,
// ) => {
// 	const { serviceId, status, rejectionReason } = payload;

// 	const isManager = await prisma.managerProfile.findUnique({
// 		where: {
// 			userId: reviewer.userId,
// 		},
// 		include: {
// 			region: {
// 				select: {
// 					id: true,
// 					area: true,
// 				},
// 			},
// 		},
// 	});

// 	if (!isManager) {
// 		throw new AppError(httpStatus.NOT_FOUND, "Manager not found");
// 	}

// 	if (isManager.isDeleted) {
// 		throw new AppError(httpStatus.BAD_REQUEST, "Manager deleted");
// 	}

// 	if (isManager.verificationStatus !== ManagerVerificationStatus.APPROVED) {
// 		throw new AppError(httpStatus.BAD_REQUEST, "manager not varified");
// 	}

// 	console.log("payload ", payload);

// 	const isService = await prisma.service.findUnique({
// 		where: {
// 			id: serviceId,
// 		},
// 	});

// 	if (!isService) {
// 		throw new AppError(httpStatus.NOT_FOUND, "service not found");
// 	}

// 	const canReviewAnyService = isManager.region.some(
// 		(region) => region.area === "All",
// 	);
// 	const canReviewService =
// 		canReviewAnyService ||
// 		isManager.region.some((region) => region.id === isService.regionId);

// 	if (!canReviewService) {
// 		throw new AppError(
// 			httpStatus.FORBIDDEN,
// 			"You can only review services in your assigned regions",
// 		);
// 	}

// 	if (isService.status !== "PENDING") {
// 		throw new AppError(
// 			httpStatus.CONFLICT,
// 			`you can't update varification status from  '${isService.status.toString()}'.`,
// 		);
// 	}

// 	if (status === "REJECTED" && !rejectionReason) {
// 		throw new AppError(
// 			httpStatus.BAD_REQUEST,
// 			"for rejection must need to rejection reason",
// 		);
// 	}

// 	const transactionResult = await prisma.$transaction(
// 		async (tx) => {
// 			await tx.service.update({
// 				where: {
// 					id: isService.id,
// 				},
// 				data: {
// 					status,
// 					rejectionReason: status === "REJECTED" ? rejectionReason : null,
// 					reviewedBy: reviewer.userId,
// 					reviewedAt: new Date(),
// 				},
// 			});

// 			if (status === "APPROVED") {
// 				await tx.workOrder.create({
// 					data: {
// 						servicingDate: isService.servicingDate,
// 						customerId: isService.customerId,
// 						serviceId: isService.id,
// 						status: "SCHEDULED",
// 						regionId: isService.regionId,
// 						managerId: isManager.id,
// 					},
// 				});
// 			}

// 			const service = await tx.service.findUnique({
// 				where: {
// 					id: isService.id,
// 				},
// 				include: {
// 					workOrders: true,
// 				},
// 			});
// 			return service;
// 		},
// 		{
// 			maxWait: 10000,
// 			timeout: 15000,
// 		},
// 	);
// 	return transactionResult
// 		? formatServiceDates(transactionResult)
// 		: transactionResult;
// };



//& ELIGIBLE TECHNICIAN
const getEligibleTechnicians = async (workOrderId: string, user: IRequestUser) => {
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


	const isManager = await prisma.managerProfile.findUnique({
		where: {
			userId: user.userId,
		},
		select: {
			region: {
				select: {
					id: true,
					area: true
				},
			},
		},
	});

	if (!isManager) {
		throw new AppError(httpStatus.NOT_FOUND, "Manager not found");
	}



	if (isManager.region[0].area !== "All") {
		const managesWorkOrderRegion = isManager.region.some(
			(region) => region.id === workOrder.regionId,
		);

		if (!managesWorkOrderRegion) {
			throw new AppError(
				httpStatus.FORBIDDEN,
				"You are not authorized to access work orders in this region",
			);
		}
	}


	const serviceDate = new Date(workOrder.servicingDate);
	const startTime = workOrder.service.preferredStartTime
		? parseTimeOnDate(workOrder.service.preferredStartTime, serviceDate)
		: parseTimeOnDate("09:00", serviceDate);
	const endTime = workOrder.service.preferredEndTime
		? parseTimeOnDate(workOrder.service.preferredEndTime, serviceDate)
		: addMinutes(startTime, workOrder.service.category.duration ?? 60);

	if (endTime.getTime() <= startTime.getTime()) {
		throw new AppError(httpStatus.BAD_REQUEST, "Invalid service time window");
	}

	const candidates = await prisma.technicianProfile.findMany({
		where: {
			status: "AVAILABLE",
			isDeleted: false,
			isProfileCompleted: true,
			user: { status: "ACTIVE", isDeleted: false },
			regions: {
				some: { id: workOrder.regionId, isActive: true },
			},
			skills: {
				some: { categoryId: workOrder.service.categoryId, isActive: true },
			},
		},

		include: {
			user: {
				omit: {
					password: true
				}
			},
			availability: {
				omit: {
					technicianId: true,
					createdAt: true,
					updatedAt: true,
					isActive: true
				}
			},
			regions: {
				select: {
					id: true,
					area: true,
				}
			},
		}
	});

	console.log('eligible technician==========', candidates)

	if (candidates.length === 0) return [];

	const { start: dayStart, end: dayEnd } = utcDayRange(serviceDate);
	const techIds = candidates.map((t) => t.id);
	const scheduleConflicts = await prisma.schedule.findMany({
		where: {
			technicianId: { in: techIds },
			workOrderId: { not: workOrderId },
			isdeleted: false,
			servicingDate: {
				gte: dayStart,
				lte: dayEnd,
			},
			status: { in: ["SCHEDULED", "CONFIRMED"] },
			AND: [{ startTime: { lt: endTime } }, { endTime: { gt: startTime } }],
		},
		select: { technicianId: true },
	});


	const conflictedTechIds = new Set(
		scheduleConflicts.map((c) => c.technicianId),
	);
	const serviceDateKey = toDateKeyUTC(serviceDate);
	const serviceDOW = getUTCDayOfWeek(serviceDate);

	const eligible = candidates.filter((tech) => {
		if (conflictedTechIds.has(tech.id)) return false;

		const isBlocked = tech.availability.some((slot) => {
			if (slot.type !== "BLOCKED") return false;
			const dateHit = slot.date
				? toDateKeyUTC(slot.date) === serviceDateKey
				: false;
			const dowHit =
				slot.dayOfWeek != null ? slot.dayOfWeek === serviceDOW : false;
			if (!dateHit && !dowHit) return false;
			if (!slot.startTime || !slot.endTime) return true; // whole-day block
			const blockStart = parseTimeOnDate(slot.startTime, serviceDate);
			const blockEnd = parseTimeOnDate(slot.endTime, serviceDate);
			return (
				blockStart.getTime() < endTime.getTime() &&
				blockEnd.getTime() > startTime.getTime()
			);
		});
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
				coversDate = slot.dayOfWeek === serviceDOW;
			else if (slot.type === "ONE_OFF" && slot.date)
				coversDate = toDateKeyUTC(slot.date) === serviceDateKey;
			if (!coversDate) return false;

			return (
				slotStart.getTime() <= startTime.getTime() &&
				endTime.getTime() <= slotEnd.getTime()
			);
		});

		return hasAvailability;
	});

	eligible.sort(
		(a, b) =>
			(b.rating ?? 0) - (a.rating ?? 0) || b.jobsCompleted - a.jobsCompleted,
	);

	return {
		service: workOrder.service,
		eligibleTech: eligible
	};
};



//& ASSIGN TECHNICIAN
const assignTechnician = async (
	payload: IAssignTechnician,
	user: IRequestUser,
) => {

	const { amount, status, technicianId, workOrderId, rejectionReason } = payload

	const isWorkOrder = await prisma.workOrder.findUnique({
		where: {
			id: workOrderId,
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
			region: true
		},
	});

	if (!isWorkOrder) {
		throw new AppError(httpStatus.NOT_FOUND, "order not found");
	}

	const isManager = await prisma.managerProfile.findUnique({
		where: {
			userId: user.userId,
		},
		include: {
			region: true
		}
	});

	if (!isManager) {
		throw new AppError(httpStatus.NOT_FOUND, "Manager not found");
	}

	if (isManager.region[0].area !== "All") {
		const managesWorkOrderRegion = isManager.region.some(
			(region) => region.id === isWorkOrder.regionId,
		);

		if (!managesWorkOrderRegion) {
			throw new AppError(
				httpStatus.FORBIDDEN,
				"You are not authorized to access work orders in this region",
			);
		}
	}

	if (status === "REJECTED") {
		const service = await prisma.service.update({
			where: {
				id: isWorkOrder.service.id,
			},
			data: {
				rejectionReason,
				assignedAt: new Date(),
				status,
				reviewedAt: new Date(),
				reviewedBy: user.userId,
			},
		});

		return service
	}

	const isTechnician = await prisma.technicianProfile.findUnique({
		where: {
			id: technicianId,
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


	if (isWorkOrder.status !== "SCHEDULED") {
		throw new AppError(
			httpStatus.BAD_REQUEST,
			`Status need to must be scheduled`,
		);
	}

	if (isWorkOrder.service.status !== "PENDING") {
		throw new AppError(httpStatus.BAD_REQUEST, "service status not approved");
	}


	const serviceDate = new Date(isWorkOrder.servicingDate);
	const startTime = isWorkOrder.service.preferredStartTime
		? parseTimeOnDate(isWorkOrder.service.preferredStartTime, serviceDate)
		: parseTimeOnDate("09:00", serviceDate);
	const endTime = isWorkOrder.service.preferredEndTime
		? parseTimeOnDate(isWorkOrder.service.preferredEndTime, serviceDate)
		: addMinutes(startTime, isWorkOrder.service.category.duration ?? 60);

	const transactionResult = await prisma.$transaction(
		async (tx) => {
			const tech = await tx.technicianProfile.findUnique({
				where: {
					id: technicianId,
				},
			});

			if (!tech) {
				throw new AppError(
					httpStatus.CONFLICT,
					"technician no longer available",
				);
			}

			const { start: dayStart, end: dayEnd } = utcDayRange(
				isWorkOrder.servicingDate,
			);
			const conflict = await tx.schedule.findFirst({
				where: {
					technicianId: technicianId,
					workOrderId: { not: workOrderId },
					isdeleted: false,
					servicingDate: {
						gte: dayStart,
						lte: dayEnd,
					},
					status: {
						in: ["SCHEDULED", "CONFIRMED"],
					},
					AND: [{ startTime: { lt: endTime } }, { endTime: { gt: startTime } }],
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
					assignedAt: new Date(),
					status,
					reviewedAt: new Date(),
					reviewedBy: user.userId,
				},
			});


			const workOrder = await tx.workOrder.update({
				where: {
					id: isWorkOrder.id,
				},
				data: {
					status: "EN_ROUTE",
					technicianId: technicianId,
					managerId: isManager.id,
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
							user: {
								omit: {
									password: true
								}
							},
						},
					},
				},
			});

			const scheduleStartTime = parseTimeOnDate(
				workOrder.service.preferredStartTime ?? "09:00",
				workOrder.servicingDate,
			);
			const scheduleEndTime =
				workOrder.service.preferredEndTime
					? parseTimeOnDate(
						workOrder.service.preferredEndTime,
						workOrder.servicingDate,
					)
					: addMinutes(
						scheduleStartTime,
						workOrder.service.category.duration ?? 60,
					);

			await tx.schedule.create({
				data: {
					workOrderId: workOrderId,
					technicianId: technicianId,
					servicingDate: workOrder.servicingDate,
					startTime: scheduleStartTime,
					endTime: scheduleEndTime,
					status: ScheduleStatus.CONFIRMED,
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


//& SOFT DELETED
const softDelete = async (id: string, user: IRequestUser) => {

	const isService = await prisma.service.findUnique({
		where: {
			id,
			customer: {
				userId: user.userId
			}
		},
	});

	if (!isService) {
		throw new AppError(httpStatus.NOT_FOUND, "service not found");
	}

	if (isService.isDeleted) {
		throw new AppError(httpStatus.BAD_REQUEST, 'Already Deleted')
	}

	if (isService.status === 'APPROVED' || isService.status === 'IN_PROGRESS' || isService.status === "ASSIGNED") {
		throw new AppError(httpStatus.BAD_REQUEST, "service cannot be deleted");
	}

	await prisma.service.update({
		where: {
			id,
		},
		data: {
			isDeleted: true,
			isDeletedAt: new Date(),
			status: "CANCELLED"

		},
		include: {
			customer: true,
		},
	});

};



export const serviceService = {
	createService,
	getMyServices,
	getALLServices,
	getSingleService,
	getEligibleTechnicians,
	assignTechnician,
	updateService,
	softDelete,
	getMyRegionServices,

};
