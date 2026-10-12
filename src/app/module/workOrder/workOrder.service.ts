import { WorkOrderWhereInput } from "../../../../generated/prisma/models";
import { ScheduleStatus, UserRole, WorkOrderStatus } from "../../../../generated/prisma/enums";
import { IQuery, IRequestUser } from "../../interface";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/appError";
import httpStatus from "http-status";
import { IUpdateStatusPayload } from "./workOrder.interface";
import { formatDateTime, formatDateToYYYYMMDD, formatTimeToHHmm } from "../../utils/utility";

// Format nested service (a) + schedule (b) times for all workOrder returns.
// Mirrors service.service.ts conversion: servicingDate -> YYYY-MM-DD,
// preferredStart/End + schedule start/end -> HH:mm. Null-safe.
const formatWorkOrder = (wo: any) => ({
	...wo,
	servicingDate: formatDateToYYYYMMDD(wo.servicingDate) ?? wo.servicingDate,
	service: wo.service
		? {
			...wo.service,
			servicingDate:
				formatDateToYYYYMMDD(wo.service.servicingDate) ??
				wo.service.servicingDate,
			preferredStartTime: formatTimeToHHmm(wo.service.preferredStartTime),
			preferredEndTime: formatTimeToHHmm(wo.service.preferredEndTime),
		}
		: wo.service,
	schedule: wo.schedule
		? {
			...wo.schedule,
			servicingDate:
				formatDateToYYYYMMDD(wo.schedule.servicingDate) ??
				wo.schedule.servicingDate,
			startTime: formatTimeToHHmm(wo.schedule.startTime),
			endTime: formatTimeToHHmm(wo.schedule.endTime),
			actualStart: formatDateTime(wo.schedule.actualStart),
			actualEnd: formatDateTime(wo.schedule.actualEnd),
		}
		: wo.schedule,
});

//& GET MY WORKORDERS
const getMyWrokOrders = async (query: IQuery, user: IRequestUser) => {
	const sort = query.sortBy ? query.sortBy : "createdAt";
	const order = query.sortOrder ? query.sortOrder : "desc";
	const page = Number(query.page || 1);
	const limit = Number(query.limit || 9);

	const isUser = await prisma.user.findUnique({
		where: {
			id: user.userId,
		},
		include: {
			customer: {
				select: {
					id: true,
				},
			},
			manager: {
				select: {
					id: true,
				},
			},
			technician: {
				select: {
					id: true,
				},
			},
		},
	});

	if (!isUser) {
		throw new AppError(httpStatus.NOT_FOUND, "user not found");
	}

	let ownerCondition: WorkOrderWhereInput;

	switch (user.role) {
		case UserRole.ADMIN:
		case UserRole.SUPER_ADMIN:
			ownerCondition = {}
			break
		case UserRole.MANAGER:
			if (!isUser.manager?.id) {
				throw new AppError(httpStatus.NOT_FOUND, "Manager profile not found");
			}
			ownerCondition = { managerId: isUser.manager.id };
			break;
		case UserRole.CUSTOMER:
			if (!isUser.customer?.id) {
				throw new AppError(httpStatus.NOT_FOUND, "Customer profile not found");
			}
			ownerCondition = { customerId: isUser.customer.id };
			break;
		case UserRole.TECHNICIAN:
			if (!isUser.technician?.id) {
				throw new AppError(
					httpStatus.NOT_FOUND,
					"Technician profile not found",
				);
			}
			ownerCondition = { technicianId: isUser.technician.id };
			break;
		default:
			throw new AppError(
				httpStatus.FORBIDDEN,
				"This user role cannot access work orders",
			);
	}

	const andCondition: WorkOrderWhereInput[] = [
		ownerCondition,
		{
			service: {
				isDeleted: false,
				// stat
			}
		}

	];


	if (query.search) {
		andCondition.push({
			OR: [
				{
					service: {
						title: {
							contains: query.search,
							mode: "insensitive"
						}
					}
				},
				{
					service: {
						category: {
							name: {
								contains: query.search,
								mode: "insensitive"
							}
						}
					}
				}
			]
		})
	}

	if (query.status) {
		andCondition.push({
			status: query.status,
		});
	}

	const workOrders = await prisma.workOrder.findMany({
		where: {
			AND: andCondition,
		},

		take: limit,
		skip: (page - 1) * limit,

		orderBy: {
			[sort]: order,
		},
		include: {
			feedback: true,
			attachment: true,
			serviceReport: true,
			customer: {
				include: {
					user: {
						omit: {
							password: true
						}
					}
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
			technician: {
				include: {
					user: {
						omit: {
							password: true
						}
					}
				}
			},
			schedule: true,
			payment: {
				omit: {
					getwayResponse: true,
				},
			},
			service: {
				include: {
					category: true
				}
			},
		},
	});

	const total = await prisma.workOrder.count({
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
		workOrders: workOrders.map(formatWorkOrder),
		meta,
	};
};


//& GET SINGLE ORDER
const getWrokOrder = async (id: string, user: IRequestUser) => {
	const isUser = await prisma.user.findUnique({
		where: {
			id: user.userId,
		},
		include: {
			customer: {
				select: {
					id: true,
				},
			},
			manager: {
				select: {
					id: true,
				},
			},
			technician: {
				select: {
					id: true,
				},
			},
		},
	});

	if (!isUser) {
		throw new AppError(httpStatus.NOT_FOUND, "user not found");
	}

	let workOrderWhereCondition: WorkOrderWhereInput;

	switch (user.role) {
		case UserRole.MANAGER:
			if (!isUser.manager?.id) {
				throw new AppError(httpStatus.NOT_FOUND, "Manager profile not found");
			}
			workOrderWhereCondition = {
				id,
				managerId: isUser.manager.id,
			};
			break;
		case UserRole.CUSTOMER:
			if (!isUser.customer?.id) {
				throw new AppError(httpStatus.NOT_FOUND, "Customer profile not found");
			}
			workOrderWhereCondition = {
				id,
				customerId: isUser.customer.id,
			};
			break;
		case UserRole.TECHNICIAN:
			if (!isUser.technician?.id) {
				throw new AppError(
					httpStatus.NOT_FOUND,
					"Technician profile not found",
				);
			}
			workOrderWhereCondition = {
				id,
				technicianId: isUser.technician.id,
			};
			break;
		default:
			throw new AppError(
				httpStatus.FORBIDDEN,
				"This user role cannot access work orders",
			);
	}

	const workOrder = await prisma.workOrder.findFirst({
		where: workOrderWhereCondition,
		include: {
			feedback: true,
			attachment: true,
			serviceReport: true,
			customer: {
				include: {
					user: {
						omit: {
							password: true,
						},
					},
				},
			},
			manager: {
				include: {
					user: {
						omit: {
							password: true,
						},
					},
				},
			},
			technician: {
				include: {
					user: {
						omit: {
							password: true,
						},
					},
				},
			},
			schedule: true,
			payment: {
				omit: {
					getwayResponse: true,
				},
			},
			service: {
				include: {
					category: true
				}
			},
		},
	});

	if (!workOrder) {
		throw new AppError(httpStatus.NOT_FOUND, "Work order not found");
	}

	return formatWorkOrder(workOrder);
};


//& GET NEW WORKORDERS (TECHNICIAN)
const getNewWrokOrders = async (query: IQuery, user: IRequestUser) => {
	const sort = query.sortBy ? query.sortBy : "createdAt";
	const order = query.sortOrder ? query.sortOrder : "desc";
	const page = Number(query.page || 1);
	const limit = Number(query.limit || 9);

	const isUser = await prisma.user.findUnique({
		where: {
			id: user.userId,
		},
		include: {
			technician: {
				select: {
					id: true,
				},
			},
		},
	});

	if (!isUser) {
		throw new AppError(httpStatus.NOT_FOUND, "user not found");
	}

	const andCondition: WorkOrderWhereInput[] = [
		{
			status: "EN_ROUTE",
			technicianId: isUser.technician?.id,
		},
	];

	const workOrders = await prisma.workOrder.findMany({
		where: {
			AND: andCondition,
		},

		take: limit,
		skip: (page - 1) * limit,

		orderBy: {
			[sort]: order,
		},
		include: {
			customer: true,
			manager: true,
			payment: true,
			service: true,
		},
	});

	const total = await prisma.workOrder.count({
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
		workOrders: workOrders.map(formatWorkOrder),
		meta,
	};
};


//& UPDATE STATUS (TECHNICIAN)
const udpateStatus = async (
	payload: IUpdateStatusPayload,
	user: IRequestUser,
) => {
	const isTech = await prisma.technicianProfile.findUnique({
		where: {
			userId: user.userId,
		},
	});

	if (!isTech) {
		throw new AppError(httpStatus.NOT_FOUND, "technician not found");
	}

	const isExist = await prisma.workOrder.findUnique({
		where: {
			id: payload.workOrderId,
			technicianId: isTech.id,
		},
		include: {
			service: true,
		},
	});

	if (!isExist) {
		throw new AppError(httpStatus.NOT_FOUND, "order not found");
	}

	if (isExist.status === WorkOrderStatus.COMPLETED) {
		throw new AppError(httpStatus.NOT_FOUND, "service work already completed");
	}

	if (isExist.status === "SCHEDULED") {
		throw new AppError(
			httpStatus.BAD_REQUEST,
			`You can't update status from ${isExist.status.toLocaleLowerCase()} to ${payload.status}`,
		);
	}

	if (isExist.status === "CANCELLED") {
		throw new AppError(
			httpStatus.BAD_REQUEST,
			`work order already cancelled. You can't update`,
		);
	}


	if (isExist.status === "EN_ROUTE" && payload.status === "COMPLETED") {
		throw new AppError(httpStatus.BAD_REQUEST, `work order status can't be updated from ${isExist.status} to ${payload.status}`)
	}

	const transactionResult = await prisma.$transaction(
		async (tx) => {
			const workOrder = await tx.workOrder.update({
				where: {
					id: isExist.id,
					technicianId: isTech.id,
				},
				data: {
					status: payload.status,
				},
			});

			if (payload.status === "STARTED") {
				await tx.service.update({
					where: {
						id: isExist.serviceId,
					},
					data: {
						status: "IN_PROGRESS",
					},
				});

				await tx.schedule.update({
					where: {
						workOrderId: workOrder.id,
					},
					data: {
						actualStart: new Date(),
					},
				});
			}

			if (payload.status === "COMPLETED") {
				await tx.service.update({
					where: {
						id: isExist.service.id,
					},
					data: {
						status: "COMPLETED",
					},
				});

				await tx.schedule.update({
					where: {
						workOrderId: isExist.id,
					},
					data: {
						actualEnd: new Date(),
						status: ScheduleStatus.COMPLETED
					},
				});

				await tx.technicianProfile.update({
					where: {
						id: isTech.id,
					},
					data: {
						status: "AVAILABLE",
						jobsCompleted: {
							increment: 1,
						},
					},
				});

				await tx.workOrder.update({
					where: {
						id: isExist.id,
					},
					data: {
						status: "COMPLETED",
					},
				});
			}

			return workOrder;
		},
		{
			maxWait: 10000,
			timeout: 15000,
		},
	);

	return formatWorkOrder(transactionResult);
};

//& GET TODAY'S WORKORDERS 
const getTodaysWorkOrders = async (query: IQuery, user: IRequestUser) => {
	const sort = query.sortBy ? query.sortBy : "createdAt";
	const order = query.sortOrder ? query.sortOrder : "desc";
	const page = Number(query.page || 1);
	const limit = Number(query.limit || 9);

	const isUser = await prisma.user.findUnique({
		where: {
			id: user.userId,
		},
		include: {
			customer: {
				select: {
					id: true,
				},
			},
			manager: {
				select: {
					id: true,
				},
			},
			technician: {
				select: {
					id: true,
				},
			},
		},
	});

	if (!isUser) {
		throw new AppError(httpStatus.NOT_FOUND, "user not found");
	}

	let ownerCondition: WorkOrderWhereInput;

	switch (user.role) {
		case UserRole.ADMIN:
		case UserRole.SUPER_ADMIN:
			ownerCondition = {};
			break;
		case UserRole.MANAGER:
			if (!isUser.manager?.id) {
				throw new AppError(httpStatus.NOT_FOUND, "Manager profile not found");
			}
			ownerCondition = { managerId: isUser.manager.id };
			break;
		case UserRole.CUSTOMER:
			if (!isUser.customer?.id) {
				throw new AppError(httpStatus.NOT_FOUND, "Customer profile not found");
			}
			ownerCondition = { customerId: isUser.customer.id };
			break;
		case UserRole.TECHNICIAN:
			if (!isUser.technician?.id) {
				throw new AppError(
					httpStatus.NOT_FOUND,
					"Technician profile not found",
				);
			}
			ownerCondition = { technicianId: isUser.technician.id };
			break;
		default:
			throw new AppError(
				httpStatus.FORBIDDEN,
				"This user role cannot access work orders",
			);
	}

	const startOfDay = new Date();
	startOfDay.setHours(0, 0, 0, 0);
	const endOfDay = new Date();
	endOfDay.setHours(23, 59, 59, 999);

	const andCondition: WorkOrderWhereInput[] = [
		ownerCondition,
		{
			servicingDate: {
				gte: startOfDay,
				lte: endOfDay,
			},
		},
	];

	if (query.search) {
		andCondition.push({
			OR: [
				{
					service: {
						title: {
							contains: query.search,
							mode: "insensitive",
						},
					},
				},
				{
					service: {
						category: {
							name: {
								contains: query.search,
								mode: "insensitive",
							},
						},
					},
				},
			],
		});
	}

	if (query.status) {
		andCondition.push({
			status: query.status,
		});
	}

	const workOrders = await prisma.workOrder.findMany({
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
				include: {
					user: {
						omit: {
							password: true,
						},
					},
				},
			},
			manager: {
				include: {
					user: {
						omit: {
							password: true,
						},
					},
				},
			},
			technician: {
				include: {
					user: {
						omit: {
							password: true,
						},
					},
				},
			},
			schedule: true,
			payment: {
				omit: {
					getwayResponse: true,
				},
			},
			service: {
				include: {
					category: true,
				},
			},
		},
	});

	const total = await prisma.workOrder.count({
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
		workOrders: workOrders.map(formatWorkOrder),
		meta,
	};
};



export const workOrderService = {
	getMyWrokOrders,
	getNewWrokOrders,
	udpateStatus,
	getWrokOrder,
	getTodaysWorkOrders,
};
