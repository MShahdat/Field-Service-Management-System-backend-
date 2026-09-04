import { CategoryWhereInput } from "../../../../generated/prisma/models";
import { IQuery, IRequestUser } from "../../interface";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/appError";
import { ICategoryPayload, IUpdateCategoryPayload } from "./category.interface";
import httpStatus from "http-status";

//& CREATE CAEGORY
const createCategory = async (
	payload: ICategoryPayload,
	user: IRequestUser,
) => {
	const isUser = await prisma.user.findUnique({
		where: {
			id: user.userId,
		},
	});

	if (!isUser) {
		throw new AppError(httpStatus.NOT_FOUND, "user not found");
	}

	const isCategory = await prisma.category.findUnique({
		where: {
			name: payload.name,
		},
	});

	if (isCategory) {
		throw new AppError(httpStatus.CONFLICT, "category already exist");
	}

	const category = await prisma.category.create({
		data: {
			...payload,
		},
	});

	return category;
};

//& GEL ALL CATEGORY (ADMIN)
const getAllCategory = async (query: IQuery) => {
	const sort = query.sortBy ? query.sortBy : "createdAt";
	const order = query.sortOrder ? query.sortOrder : "desc";
	const page = Number(query.page || 1);
	const limit = Number(query.limit || 20);

	const andConditions: CategoryWhereInput[] = [];

	//~ searching
	if (query.search) {
		andConditions.push({
			OR: [
				{
					name: {
						contains: query.search,
						mode: "insensitive",
					},
				},
			],
		});
	}

	//~ filtering

	if (query.isActive) {
		andConditions.push({
			isActive: query.isActive,
		});
	}

	if (query.name) {
		andConditions.push({
			name: query.name,
		});
	}

	const category = await prisma.category.findMany({
		where: {
			AND: andConditions,
		},
		take: limit,
		skip: (page - 1) * limit,
		orderBy: {
			[sort]: order,
		},
	});

	const total = await prisma.category.count({
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
		category,
		meta,
	};
};

//& GEL ALL CATEGORY (PUBLIC)
const getCategories = async (query: IQuery) => {
	const sort = query.sortBy ? query.sortBy : "createdAt";
	const order = query.sortOrder ? query.sortOrder : "desc";
	const page = Number(query.page || 1);
	const limit = Number(query.limit || 20);

	const andConditions: CategoryWhereInput[] = [
		{
			isActive: true,
		},
	];

	//~ searching
	if (query.search) {
		andConditions.push({
			OR: [
				{
					name: {
						contains: query.search,
						mode: "insensitive",
					},
				},
			],
		});
	}

	//~ filtering
	if (query.name) {
		andConditions.push({
			name: query.name,
		});
	}

	const category = await prisma.category.findMany({
		where: {
			AND: andConditions,
		},
		take: limit,
		skip: (page - 1) * limit,
		orderBy: {
			[sort]: order,
		},
	});

	const total = await prisma.category.count({
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
		category,
		meta,
	};
};

//& UPDATE CATEGORY (ADMIN)
const udpateCategory = async (payload: IUpdateCategoryPayload, id: string) => {
	const isCategory = await prisma.category.findUnique({
		where: { id },
	});

	if (!isCategory) {
		throw new AppError(httpStatus.NOT_FOUND, "category not found");
	}

	const update = await prisma.category.update({
		where: {
			id,
		},
		data: {
			...payload,
		},
	});

	return update;
};

export const categoryService = {
	createCategory,
	getAllCategory,
	getCategories,
	udpateCategory,
};
