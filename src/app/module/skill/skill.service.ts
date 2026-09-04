import { SkillWhereInput } from "../../../../generated/prisma/models";
import { IQuery, IRequestUser } from "../../interface";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/appError";
import { ISkillPayload, IUpdateSkillPayload } from "./skill.interface";
import httpStatus from "http-status";

//& CREATE
const createSkill = async (payload: ISkillPayload, user: IRequestUser) => {
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
			id: payload.categoryId,
		},
	});

	if (!isCategory) {
		throw new AppError(httpStatus.NOT_FOUND, "category not found");
	}

	const isSkill = await prisma.skill.findUnique({
		where: {
			name: payload.name,
		},
	});

	if (isSkill) {
		throw new AppError(httpStatus.CONFLICT, "skill already exist");
	}

	const skill = await prisma.skill.create({
		data: {
			...payload,
		},
	});

	return skill;
};

//& GET ALL (PUBLIC)
const getAllSkill = async (query: IQuery) => {
	const sort = query.sortBy ? query.sortBy : "createdAt";
	const order = query.sortOrder ? query.sortOrder : "desc";
	const page = Number(query.page || 1);
	const limit = Number(query.limit || 20);

	const andConditions: SkillWhereInput[] = [];

	if (query.search) {
		andConditions.push({
			OR: [
				{
					name: {
						contains: query.search,
						mode: "insensitive",
					},
				},
				{
					description: {
						contains: query.search,
						mode: "insensitive",
					},
				},
			],
		});
	}

	if (query.isActive) {
		andConditions.push({
			category: {
				isActive: query.isActive,
			},
		});
	}

	if (query.name) {
		andConditions.push({
			name: query.name,
		});
	}

	if (query.categoryId) {
		andConditions.push({
			categoryId: query.categoryId,
		});
	}

	const skill = await prisma.skill.findMany({
		where: {
			AND: andConditions,
		},
		take: limit,
		skip: (page - 1) * limit,
		orderBy: {
			[sort]: order,
		},
		include: {
			category: {
				select: {
					id: true,
					name: true,
					icon: true,
				},
			},
		},
	});

	const total = await prisma.skill.count({
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
		skill,
		meta,
	};
};

//& GET ALL (ADMIN)
const getSkills = async (query: IQuery) => {
	const sort = query.sortBy ? query.sortBy : "createdAt";
	const order = query.sortOrder ? query.sortOrder : "desc";
	const page = Number(query.page || 1);
	const limit = Number(query.limit || 20);

	const andConditions: SkillWhereInput[] = [
		{
			category: {
				isActive: true,
			},
		},
	];

	if (query.search) {
		andConditions.push({
			OR: [
				{
					name: {
						contains: query.search,
						mode: "insensitive",
					},
				},
				{
					description: {
						contains: query.search,
						mode: "insensitive",
					},
				},
			],
		});
	}

	if (query.name) {
		andConditions.push({
			name: query.name,
		});
	}

	if (query.categoryId) {
		andConditions.push({
			categoryId: query.categoryId,
		});
	}

	const skill = await prisma.skill.findMany({
		where: {
			AND: andConditions,
		},
		take: limit,
		skip: (page - 1) * limit,
		orderBy: {
			[sort]: order,
		},
		include: {
			category: {
				select: {
					id: true,
					name: true,
					icon: true,
				},
			},
		},
	});

	const total = await prisma.skill.count({
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
		skill,
		meta,
	};
};

//& UDPATE SKILL
const updateSkill = async (payload: IUpdateSkillPayload, id: string) => {
	const isSkill = await prisma.skill.findUnique({
		where: { id },
	});

	if (!isSkill) {
		throw new AppError(httpStatus.NOT_FOUND, "skill not found");
	}

	if (payload.categoryId) {
		const isCategory = await prisma.category.findUnique({
			where: { id: payload.categoryId },
		});

		if (!isCategory) {
			throw new AppError(httpStatus.NOT_FOUND, "category not found");
		}
	}

	if (payload.name && payload.name !== isSkill.name) {
		const isNameExists = await prisma.skill.findUnique({
			where: { name: payload.name },
		});

		if (isNameExists) {
			throw new AppError(httpStatus.CONFLICT, "skill name already exist");
		}
	}

	const update = await prisma.skill.update({
		where: {
			id,
		},
		data: {
			...payload,
		},
	});

	return update;
};

export const skillService = {
	createSkill,
	getAllSkill,
	getSkills,
	updateSkill,
};
