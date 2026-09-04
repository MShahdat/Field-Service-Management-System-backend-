import {
	ManagerVerificationStatus,
	UserRole,
} from "../../../../generated/prisma/enums";
import { ServiceWhereInput } from "../../../../generated/prisma/models";
import { IQuery, IRequestUser } from "../../interface";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/appError";
import { IReviewPayload, IServicePayload } from "./service.interface";
import httpStatus from "http-status";

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

	if (!isCustomer || !isCustomer.customer?.id) {
		throw new AppError(
			httpStatus.INTERNAL_SERVER_ERROR,
			"Something went wrong",
		);
	}

	const service = await prisma.service.create({
		data: {
			...payload,
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
					// reviewdBy: reviewer.userId,
					reviewAt: new Date(),
				},
			});

			if (status === "APPROVED") {
				await tx.workOrder.create({
					data: {
						scheduledDate: isService.requestedDate,
						customerId: isService.customerId,
						serviceId: isService.id,
						status: "SCHEDULED",
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

export const serviceService = {
	createService,
	getMyServices,
	getALLServices,
	getSingleService,
	reviewService,
};
