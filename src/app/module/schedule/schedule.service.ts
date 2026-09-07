import { ScheduleWhereInput } from "../../../../generated/prisma/models";
import { IQuery, IRequestUser } from "../../interface";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/appError";
import httpStatus from "http-status";

//& GEL ALL SCHEDULE (ADMIN)
const getAllSchedule = async (query: IQuery) => {
	const sort = query.sortBy ? query.sortBy : "createdAt";
	const order = query.sortOrder ? query.sortOrder : "desc";
	const page = Number(query.page || 1);
	const limit = Number(query.limit || 20);

	const andConditions: ScheduleWhereInput[] = [];

	//~ filtering
	if (query.status) {
		andConditions.push({
			status: query.status,
		});
	}

	const schedules = await prisma.schedule.findMany({
		where: {
			AND: andConditions,
		},
		take: limit,
		skip: (page - 1) * limit,
		orderBy: {
			[sort]: order,
		},
		include: {
			workOrder: {
				select: {
					service: true,
				},
			},
		},
	});

	const total = await prisma.schedule.count({
		where: {
			AND: andConditions,
		},
	});

	const meta = {
		total,
		page,
		limit,
		totalPages: Math.ceil(total / limit),
	};

	return {
		schedules,
		meta,
	};
};

//& GEL ALL SCHEDULE (TECHNICIAN)
const getScheduleTech = async (query: IQuery, user: IRequestUser) => {
	const sort = query.sortBy ? query.sortBy : "createdAt";
	const order = query.sortOrder ? query.sortOrder : "desc";
	const page = Number(query.page || 1);
	const limit = Number(query.limit || 20);

	const technician = await prisma.technicianProfile.findUnique({
		where: {
			userId: user.userId,
		},
	});

	if (!technician) {
		throw new AppError(httpStatus.NOT_FOUND, "technician not found");
	}

	const andConditions: ScheduleWhereInput[] = [
		{
			technicianId: technician.id,
		},
	];

	//~ filtering
	if (query.status) {
		andConditions.push({
			status: query.status,
		});
	}

	const schedules = await prisma.schedule.findMany({
		where: {
			AND: andConditions,
		},
		take: limit,
		skip: (page - 1) * limit,
		orderBy: {
			[sort]: order,
		},
		include: {
			workOrder: {
				select: {
					service: true,
				},
			},
		},
	});

	const total = await prisma.schedule.count({
		where: {
			AND: andConditions,
		},
	});

	const meta = {
		total,
		page,
		limit,
		totalPages: Math.ceil(total / limit),
	};

	return {
		schedules,
		meta,
	};
};

//& SINGLE SCHEDULE ()
const singleSchedule = async (id: string, user: IRequestUser) => {
	const isUser = await prisma.user.findUnique({
		where: {
			id: user.userId,
		},
		include: {
			customer: true,
			manager: true,
			technician: true,
		},
	});

	if (!isUser) {
		throw new AppError(httpStatus.NOT_FOUND, "user nto found");
	}

	const schedule = await prisma.schedule.findUnique({
		where: {
			id,
		},
		include: {
			workOrder: {
				include: {
					service: true,
					manager: true,
					technician: true,
					customer: true,
				},
			},
		},
	});

	if (!schedule) {
		throw new AppError(httpStatus.NOT_FOUND, "schedule not found");
	}

	if (user.role === "CUSTOMER") {
		if (schedule.workOrder.customer.id !== isUser.customer?.id) {
			throw new AppError(httpStatus.UNAUTHORIZED, "unauthorized access");
		}
	}

	if (user.role === "MANAGER") {
		if (schedule.workOrder.manager.id !== isUser.manager?.id) {
			throw new AppError(httpStatus.UNAUTHORIZED, "unauthorized access");
		}
	}

	if (user.role === "TECHNICIAN") {
		if (schedule.workOrder.technician?.id !== isUser.technician?.id) {
			throw new AppError(httpStatus.UNAUTHORIZED, "unauthorized access");
		}
	}

	return schedule;
};

export const scheduleService = {
	getAllSchedule,
	getScheduleTech,
	singleSchedule,
};
