import { FeedbackWhereInput } from "../../../../generated/prisma/models";
import { IQuery, IRequestUser } from "../../interface";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/appError";
import { IFeedbackPayload, IFeedbackUpdatePayload } from "./feedback.interface";
import httpStatus from "http-status";

//& CREATE FEEDBACK
const createFeedback = async (
	payload: IFeedbackPayload,
	user: IRequestUser,
) => {
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

	if (isCustomer.user.status === "BLOCKED") {
		throw new Error("You are bloked! Please unblock first then give review");
	}

	if (isCustomer.isDeleted) {
		throw new Error("You are deleted!");
	}

	const workOrder = await prisma.workOrder.findUnique({
		where: {
			id: payload.workOrderId,
		},
	});

	if (!workOrder) {
		throw new AppError(httpStatus.NOT_FOUND, "work order not found");
	}

	if (workOrder.status !== "COMPLETED") {
		throw new AppError(
			httpStatus.BAD_REQUEST,
			"without complete you can not crate review",
		);
	}

	if (workOrder.customerId !== isCustomer.id) {
		throw new Error("You are not authorized to review");
	}

	const existingFeedback = await prisma.feedback.findFirst({
		where: {
			workOrderId: workOrder.id,
		},
	});

	if (existingFeedback) {
		throw new Error("You have already reviewed this service work");
	}

	const createFeedback = await prisma.feedback.create({
		data: {
			...payload,
		},
		include: {
			workOrder: true,
		},
	});
	return createFeedback;
};

//& GET FEEDBACK BY ID
const getById = async (id: string) => {
	const result = await prisma.feedback.findUnique({
		where: {
			id,
		},
		include: {
			workOrder: true,
		},
	});

	if (!result) {
		throw new AppError(httpStatus.NOT_FOUND, "feedback not found");
	}

	return result;
};

//& get all feedback
const getAllFeedbacks = async (query: IQuery) => {
	const sort = query.sortBy ? query.sortBy : "createdAt";
	const order = query.sortOrder ? query.sortOrder : "desc";
	const page = Number(query.page || 1);
	const limit = Number(query.limit || 9);

	const andConditions: FeedbackWhereInput[] = [];

	if (query.technicianId) {
		andConditions.push({
			workOrder: {
				technicianId: query.technicianId,
			},
		});
	}

	if (query.customerId) {
		andConditions.push({
			workOrder: {
				customerId: query.customerId,
			},
		});
	}

	if (query.managerId) {
		andConditions.push({
			workOrder: {
				managerId: query.managerId,
			},
		});
	}

	if (query.minRating || query.maxRating) {
		andConditions.push({
			rating: {
				...(query.minRating && { gte: Number(query.minRating) }),
				...(query.maxRating && { lte: Number(query.maxRating) }),
			},
		});
	}

	const allFeedback = await prisma.feedback.findMany({
		where: {
			AND: andConditions,
		},
		take: limit,
		skip: (page - 1) * limit,

		orderBy: {
			[sort]: order,
		},
		include: {
			workOrder: true,
		},
	});

	const total = await prisma.feedback.count({
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
		allFeedback,
		meta,
	};
};

//& UDPATE FEEDBACK
const updateFeedback = async (
	payload: IFeedbackUpdatePayload,
	id: string,
	user: IRequestUser,
) => {
	const isCustomer = await prisma.customerProfile.findUnique({
		where: {
			userId: user.userId,
		},
		include: {
			user: true,
		},
	});

	if (!isCustomer) {
		throw new AppError(httpStatus.NOT_FOUND, "user not found");
	}

	const feedback = await prisma.feedback.findUnique({
		where: {
			id,
			workOrder: {
				customerId: isCustomer.id,
			},
		},
	});

	if (!feedback) {
		throw new AppError(httpStatus.NOT_FOUND, "feedback not found");
	}

	const result = await prisma.feedback.update({
		where: {
			id: feedback.id,
			workOrder: {
				customerId: isCustomer.id,
			},
		},
		data: {
			...payload,
		},
	});

	return result;
};

//& DELETED FEEDBACK
const deleteFeedback = async (id: string, user: IRequestUser) => {
	const isCustomer = await prisma.customerProfile.findUnique({
		where: {
			userId: user.userId,
		},
		include: {
			user: true,
		},
	});

	if (!isCustomer) {
		throw new AppError(httpStatus.NOT_FOUND, "user not found");
	}

	const feedback = await prisma.feedback.findUnique({
		where: {
			id,
			workOrder: {
				customerId: isCustomer.id,
			},
		},
	});

	if (!feedback) {
		throw new AppError(httpStatus.NOT_FOUND, "feedback not found");
	}

	const result = await prisma.feedback.delete({
		where: {
			id: feedback.id,
			workOrder: {
				customerId: isCustomer.id,
			},
		},
	});

	return result;
};

export const feedbackService = {
	createFeedback,
	getById,
	getAllFeedbacks,
	updateFeedback,
	deleteFeedback,
};
