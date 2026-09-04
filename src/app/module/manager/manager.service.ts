import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/appError";
import {
	EmailVerify,
	IApproveManager,
	IManagerApplyPayload,
} from "./manager.interface";
import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import config from "../../config/env";
import { UserRole } from "../../../../generated/prisma/enums";
import crypto from "crypto";
import { redisClient } from "../../lib/redis";
import path from "path";
import ejs from "ejs";
import { transporter } from "../../lib/nodemailer";
import { IQuery, IRequestUser } from "../../interface";
import { ManagerProfileWhereInput } from "../../../../generated/prisma/models";

//& APPLY MANAGER
const applyManager = async (payload: IManagerApplyPayload) => {
	const isManager = await prisma.user.findUnique({
		where: {
			email: payload.user.email,
		},
	});

	if (isManager) {
		throw new AppError(httpStatus.CONFLICT, "manager already exists");
	}

	const regionIds = payload.manager.region || [];

	if (regionIds.length > 0) {
		const existingRegions = await prisma.region.findMany({
			where: { id: { in: regionIds } },
			select: { id: true },
		});

		const existingIds = existingRegions.map((r) => r.id);
		const invalidIds = regionIds.filter((id) => !existingIds.includes(id));

		if (invalidIds.length > 0) {
			throw new AppError(
				httpStatus.BAD_REQUEST,
				`Invalid region ID(s): ${invalidIds.join(", ")}. These regions do not exist.`,
			);
		}
	}

	const randomPass = Math.random().toString(36).slice(-8);
	console.log("random pass", randomPass);

	const hashPass = await bcrypt.hash(
		randomPass,
		Number(config.bcrypt_salt_rounds),
	);

	const { region, ...managerData } = payload.manager;

	const apply = await prisma.user.create({
		data: {
			...payload.user,
			password: hashPass,
			needPasswordChange: true,
			role: UserRole.MANAGER,
			manager: {
				create: {
					...managerData,
					region: {
						connect: regionIds.map((id) => ({ id })),
					},
				},
			},
		},
		omit: {
			password: true,
		},
		include: {
			manager: {
				include: {
					region: true,
				},
			},
		},
	});

	const expirationTime = 60 * 60;
	const otpKey = `manager-otp-key: ${payload.user.email}`;
	const otp = crypto.randomInt(99999, 1000000);

	await redisClient.set(otpKey, otp, {
		expiration: {
			type: "EX",
			value: expirationTime,
		},
	});

	const templatePath = path.join(
		process.cwd(),
		"src/app/template/verification-otp.ejs",
	);

	const templateData = {
		name: payload.user.name,
		otp,
		expire: expirationTime / 60,
		appName: config.app_name,
	};

	const html = await ejs.renderFile(templatePath, templateData);

	await transporter.sendMail({
		from: config.smtp_sender,
		to: payload.user.email,
		subject: "Email Verification OTP",
		html,
	});

	return apply;
};

//& VERIFY EMAIL BY OTP
const emailVerify = async (payload: EmailVerify) => {
	const { email, otp } = payload;

	const isManager = await prisma.user.findUnique({
		where: {
			email,
			role: UserRole.MANAGER,
		},
	});

	if (!isManager) {
		throw new AppError(httpStatus.NOT_FOUND, "Manager does not exist");
	}

	if (isManager.emailVerified) {
		throw new AppError(httpStatus.CONFLICT, "manager's email alredy verified");
	}

	const otpKey = `manager-otp-key: ${email}`;
	const redisOTP = await redisClient.get(otpKey);

	if (!redisOTP) {
		throw new AppError(
			httpStatus.BAD_REQUEST,
			"otp expired. please apply again",
		);
	}

	if (redisOTP !== otp) {
		throw new AppError(
			httpStatus.BAD_REQUEST,
			"OTP mismatch. please give valid OTP",
		);
	}

	const updatedUser = await prisma.user.update({
		where: {
			email,
			role: UserRole.MANAGER,
		},
		data: {
			emailVerified: true,
		},
		omit: {
			password: true,
		},
		include: {
			manager: {
				include: {
					region: true,
				},
			},
		},
	});

	await redisClient.del(otpKey);

	return updatedUser;
};

//& APPROVE MANAGER (ADMIN)
const approveManager = async (
	payload: IApproveManager,
	reviewer: IRequestUser,
) => {
	const { email, verificationStatus, rejectionReason } = payload;

	const isManager = await prisma.user.findUnique({
		where: {
			email,
		},
		include: {
			manager: true,
		},
	});

	if (!isManager) {
		throw new AppError(httpStatus.NOT_FOUND, "Manager not found");
	}

	if (!isManager.emailVerified) {
		throw new AppError(
			httpStatus.BAD_REQUEST,
			"Manager email not verified yet",
		);
	}

	if (isManager.isDeleted) {
		throw new AppError(httpStatus.FORBIDDEN, "Manager is deleted");
	}

	if (isManager.manager?.verificationStatus !== "PENDING") {
		throw new AppError(
			httpStatus.CONFLICT,
			`you can't update varification status from  '${isManager.manager?.verificationStatus.toLowerCase()}'.`,
		);
	}

	if (verificationStatus === "REJECTED" && !rejectionReason) {
		throw new AppError(
			httpStatus.BAD_REQUEST,
			"for rejection must need to rejection reason",
		);
	}

	const updateStatus = await prisma.managerProfile.update({
		where: {
			id: isManager.manager.id,
		},
		data: {
			verificationStatus,
			rejectionReason:
				verificationStatus === "REJECTED" ? rejectionReason : null,
			reviewdBy: reviewer.userId,
			reviewdAt: new Date(),
		},
		include: {
			region: true,
		},
	});

	const isApproved = updateStatus.verificationStatus === "APPROVED";
	const templateName = isApproved
		? "manager-apply-approved.ejs"
		: "manager-apply-rejected.ejs";

	const templatePath = path.join(
		process.cwd(),
		`src/app/template/${templateName}`,
	);

	const templateData = {
		name: isManager.name,
		reason: rejectionReason, // only used in the rejected template,
		appName: config.app_name,
	};

	const html = await ejs.renderFile(templatePath, templateData);
	await transporter.sendMail({
		from: config.smtp_sender,
		to: isManager.email,
		subject: isApproved
			? "Your Manager Application Has Been Approved"
			: "Your Manager Application Has Been Rejected",
		html,
	});

	return updateStatus;
};

//& GEL ALL MANAGERS (ADMIN)
const getAllManagers = async (query: IQuery) => {
	const sort = query.sortBy ? query.sortBy : "createdAt";
	const order = query.sortOrder ? query.sortOrder : "desc";
	const page = Number(query.page || 1);
	const limit = Number(query.limit || 20);

	const andConditions: ManagerProfileWhereInput[] = [
		{
			isDeleted: false,
		},
	];

	//~ searching
	if (query.search) {
		andConditions.push({
			OR: [
				{
					user: {
						name: {
							contains: query.search,
							mode: "insensitive",
						},
					},
				},
				{
					user: {
						email: {
							contains: query.search,
							mode: "insensitive",
						},
					},
				},
			],
		});
	}

	//~ filtering

	// if(query.region){
	// 	const region = query.region as string
	// 	const arr = region.split(',').map((item) => item.trim())

	// 	andConditions.push({
	// 		region: {
	// 			hasSome: arr
	// 		}
	// 	})
	// }

	if (query.verificationStatus) {
		andConditions.push({
			verificationStatus: query.verificationStatus,
		});
	}

	const managers = await prisma.managerProfile.findMany({
		where: {
			AND: andConditions,
		},
		take: limit,
		skip: (page - 1) * limit,
		orderBy: {
			[sort]: order,
		},
		include: {
			user: {
				omit: {
					password: true,
				},
			},
		},
	});

	const total = await prisma.managerProfile.count({
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
		managers,
		meta,
	};
};

export const managerService = {
	applyManager,
	emailVerify,
	approveManager,
	getAllManagers,
};
