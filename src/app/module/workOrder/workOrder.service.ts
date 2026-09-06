import { WorkOrderWhereInput } from "../../../../generated/prisma/models";
import { UserRole } from "../../../../generated/prisma/enums";
import { IQuery, IRequestUser } from "../../interface";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/appError";
import httpStatus from "http-status";
import { IUpdateStatusPayload } from "./workOrder.interface";

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

	const andCondition: WorkOrderWhereInput[] = [ownerCondition];

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
		workOrders,
		meta,
	};
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
		workOrders,
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
	});

	if (!isExist) {
		throw new AppError(httpStatus.NOT_FOUND, "order not found");
	}

	if (isExist.status === "SCHEDULED") {
		throw new AppError(
			httpStatus.BAD_REQUEST,
			`You can't update status from ${isExist.status.toLocaleLowerCase()}`,
		);
	}

	if (isExist.status === "CANCELLED" || isExist.status === "COMPLETED") {
		throw new AppError(
			httpStatus.BAD_REQUEST,
			`work order already ${isExist.status}. You can't update`,
		);
	}

	if (isExist.status === "STARTED") {
		if (payload.status === "EN_ROUTE") {
			throw new AppError(
				httpStatus.BAD_REQUEST,
				`you can't updated from ${isExist.status.toLowerCase} to ${payload.status.toLocaleLowerCase}`,
			);
		}
	}

	const workOrder = await prisma.workOrder.update({
		where: {
			id: isExist.id,
			technicianId: isTech.id,
		},
		data: {
			status: payload.status,
			actualStart:
				payload.status === "STARTED" ? new Date() : isExist.actualStart,
			actualEnd:
				payload.status === "COMPLETED" ? new Date() : isExist.actualEnd,
		},
	});

	return workOrder;
};

export const workOrderService = {
	getMyWrokOrders,
	getNewWrokOrders,
	udpateStatus,
};
