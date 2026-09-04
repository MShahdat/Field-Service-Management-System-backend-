import { UserRole } from "../../../../generated/prisma/enums";
import { ServiceWhereInput } from "../../../../generated/prisma/models";
import { IQuery, IRequestUser } from "../../interface";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/appError";
import { IServicePayload } from "./service.interface";
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

//& REVIEW AND ASSIGN
const reviewService = async (serviceId: string, user: IRequestUser) => {
	const isManager = await prisma.managerProfile.findUnique({
		where: {
			userId: user.userId,
		},
	});

	if (!isManager) {
		throw new AppError(httpStatus.NOT_FOUND, "manager not found");
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
};

export const serviceService = {
	createService,
	getMyServices,
	getALLServices,
	reviewService,
};
