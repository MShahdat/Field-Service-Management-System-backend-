import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/appError";
import {
	IForgotPasswordPayload,
	ILoginUserPayload,
	IRegisterCustomerPayload,
	IResetPasswordPayload,
	IVerifyEmailPayload,
} from "./auth.interface";
import httpStatus from "http-status";
import config from "../../config/env";
import crypto from "crypto";
import { redisClient } from "../../lib/redis";
import path from "path";
import ejs from "ejs";
import { transporter } from "../../lib/nodemailer";
import { UserRole, UserStatus } from "../../../../generated/prisma/enums";
import { jwtUtils } from "../../utils/jwt";
import { JwtPayload, SignOptions } from "jsonwebtoken";
import { IRequestUser } from "../../interface";

//& STORE REDIS AND OTP SEND
const registerOTP = async (payload: IRegisterCustomerPayload) => {
	const { name, password } = payload;

	const email = payload.email.trim().toLowerCase();

	const isUserExists = await prisma.user.findUnique({
		where: { email },
	});

	if (isUserExists) {
		throw new AppError(
			httpStatus.CONFLICT,
			"User with this email already exists",
		);
	}

	const hashedPassword = await bcrypt.hash(
		password,
		Number(config.bcrypt_salt_rounds),
	);

	const expirationTime = 5 * 60;
	const otp = crypto.randomInt(100000, 1000000);
	const otpKey = `customer-register-otp: ${email}`;

	await redisClient.set(otpKey, otp, {
		expiration: {
			type: "EX",
			value: expirationTime,
		},
	});

	const registerKey = `customer-register-data: ${email}`;
	const registerValue = {
		name,
		email,
		password: hashedPassword,
	};

	await redisClient.set(registerKey, JSON.stringify(registerValue), {
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
		name,
		otp,
		expire: expirationTime / 60,
		app_name: config.app_name,
	};

	const html = await ejs.renderFile(templatePath, templateData);

	await transporter.sendMail({
		from: config.smtp_sender,
		to: email,
		subject: "Email Verification",
		html,
	});
};

//& EMAIL VERIFY AND ACCOUNT CREATE
const verifyEmail = async (payload: IVerifyEmailPayload) => {
	const { email, otp } = payload;

	const registerKey = `customer-register-data: ${email}`;
	const redisData = await redisClient.get(registerKey);

	const otpKey = `customer-register-otp: ${email}`;
	const redisOTP = await redisClient.get(otpKey);

	if (!redisData || !redisOTP) {
		throw new AppError(httpStatus.BAD_REQUEST, "Invalid Data from redis!");
	}

	const payloadData = JSON.parse(redisData) as IRegisterCustomerPayload;

	if (payloadData.email !== email) {
		throw new AppError(httpStatus.BAD_REQUEST, "Invalid email");
	}

	if (redisOTP !== otp) {
		throw new AppError(httpStatus.BAD_REQUEST, "OTP does not match!");
	}

	const isCustomer = await prisma.user.findUnique({
		where: { email },
	});

	if (isCustomer) {
		throw new AppError(httpStatus.CONFLICT, "Email alredy exist");
	}

	const customerCreated = await prisma.user.create({
		data: {
			name: payloadData.name,
			email: payloadData.email,
			password: payloadData.password,
			role: UserRole.CUSTOMER,
			emailVerified: true,
			status: "ACTIVE",
			customer: {
				create: {},
			},
		},
		omit: {
			password: true,
		},
		include: {
			customer: true,
		},
	});

	const templateData = {
		name: payloadData.name,
		appName: config.app_name,
	};

	const html = await ejs.renderFile(
		path.join(process.cwd(), "src/app/template/welcome.ejs"),
		templateData,
	);

	await transporter.sendMail({
		from: config.smtp_sender,
		to: payloadData.email,
		subject: `Welcome to ${config.app_name}`,
		html,
	});

	await redisClient.del([otpKey, registerKey]);

	const { customer, ...user } = customerCreated;

	const jwtPayload = {
		userId: user.id,
		name: user.name,
		email: user.email,
		role: user.role,
	};

	const accessToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_access_secret,
		config.jwt_access_expires_in as SignOptions,
	);

	const refreshToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_refresh_secret,
		config.jwt_refresh_expires_in as SignOptions,
	);

	return {
		user,
		accessToken,
		refreshToken,
		customer,
	};
};

//& LOGIN USER
const loginUser = async (payload: ILoginUserPayload) => {
	const { password } = payload;
	const email = payload.email.trim().toLowerCase();

	const user = await prisma.user.findUnique({
		where: { email },
	});

	if (!user) {
		throw new AppError(httpStatus.NOT_FOUND, "User not found");
	}

	if (user.status === "BLOCKED") {
		throw new AppError(httpStatus.FORBIDDEN, "User is blocked");
	}

	if (user.isDeleted || user.status === "DELETED") {
		throw new AppError(httpStatus.FORBIDDEN, "User is deleted");
	}

	const isPasswordMatched = await bcrypt.compare(
		password,
		user.password as string,
	);

	if (!isPasswordMatched) {
		throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");
	}

	const jwtPayload = {
		userId: user.id,
		name: user.name,
		email: user.email,
		role: user.role,
	};

	const accessToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_access_secret,
		config.jwt_access_expires_in as SignOptions,
	);

	const refreshToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_refresh_secret,
		config.jwt_refresh_expires_in as SignOptions,
	);

	return {
		accessToken,
		refreshToken,
	};
};

//& GET ME
const getMe = async (user: IRequestUser) => {
	const isUserExists = await prisma.user.findUnique({
		where: {
			id: user.userId,
		},
		include: {
			customer: true,
		},
		omit: {
			password: true,
		},
	});

	if (!isUserExists) {
		throw new AppError(httpStatus.NOT_FOUND, "User not found");
	}

	return isUserExists;
};

//& CREATE ACCESS TOKEN
const refreshToken = async (token: string) => {
	const verifiedRefreshToken = jwtUtils.verifyToken(
		token,
		config.jwt_refresh_secret,
	);

	if (!verifiedRefreshToken.success || !verifiedRefreshToken.data) {
		throw new AppError(
			httpStatus.UNAUTHORIZED,
			config.node_env === "development"
				? verifiedRefreshToken.error
				: "Invalid refresh token",
		);
	}

	const data = verifiedRefreshToken.data as JwtPayload;

	const user = await prisma.user.findUnique({
		where: { id: data.userId },
	});

	if (!user || user.isDeleted || user.status !== UserStatus.ACTIVE) {
		throw new AppError(
			httpStatus.UNAUTHORIZED,
			"User is inactive or not found",
		);
	}

	const jwtPayload = {
		userId: user.id,
		name: user.name,
		email: user.email,
		role: user.role,
	};

	const accessToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_access_secret,
		config.jwt_access_expires_in as SignOptions,
	);

	const refreshToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_refresh_secret,
		config.jwt_refresh_expires_in as SignOptions,
	);

	return {
		accessToken,
		refreshToken,
	};
};

//& FORGOT PASSWORD
const forgotPassword = async (payload: IForgotPasswordPayload) => {
	const { email } = payload;

	const isExistUser = await prisma.user.findUnique({
		where: { email },
	});

	if (!isExistUser) {
		throw new AppError(httpStatus.NOT_FOUND, "User does not exist");
	}

	if (isExistUser.status === "BLOCKED") {
		throw new AppError(httpStatus.FORBIDDEN, "User thas temporary blocked");
	}

	if (isExistUser.status === UserStatus.DELETED) {
		throw new AppError(httpStatus.FORBIDDEN, "user has deleted");
	}

	const otp = crypto.randomInt(100000, 1000000).toString();

	const expirationTime = 5 * 60;
	const key = `forgot-password-otp: ${isExistUser.email}`;
	await redisClient.set(key, otp, {
		expiration: {
			type: "EX",
			value: expirationTime,
		},
	});

	const templatePath = path.join(
		process.cwd(),
		"src/app/template/forgot-password-otp.ejs",
	);

	const templateData = {
		name: isExistUser.name,
		otp,
		expire: expirationTime / 60,
		appName: config.app_name,
	};

	const html = await ejs.renderFile(templatePath, templateData);

	await transporter.sendMail({
		from: config.smtp_sender,
		to: isExistUser.email,
		subject: "Forgot Password OTP",
		html,
	});
};

//& RESET PASSWORD
const resetPassword = async (payload: IResetPasswordPayload) => {
	const { email, otp, newPassword } = payload;

	const isExistUser = await prisma.user.findUnique({
		where: { email },
	});

	if (!isExistUser) {
		throw new AppError(httpStatus.NOT_FOUND, "User does not exist");
	}

	if (isExistUser.status === "BLOCKED") {
		throw new AppError(httpStatus.FORBIDDEN, "User thas temporary blocked");
	}

	if (isExistUser.status === UserStatus.DELETED) {
		throw new AppError(httpStatus.FORBIDDEN, "user has deleted");
	}

	const key = `forgot-password-otp: ${isExistUser.email}`;
	const redisOTP = await redisClient.get(key);

	if (!redisOTP) {
		throw new AppError(httpStatus.BAD_REQUEST, "Invalid OTP");
	}

	if (redisOTP !== otp) {
		throw new AppError(httpStatus.BAD_REQUEST, "OTP does not match");
	}

	const hashPass = await bcrypt.hash(
		newPassword,
		Number(config.bcrypt_salt_rounds),
	);

	await prisma.user.update({
		where: { email },
		data: {
			password: hashPass,
		},
	});

	const templateData = {
		name: isExistUser.name,
	};

	const html = await ejs.renderFile(
		path.join(process.cwd(), "src/app/template/reset-password.ejs"),
		templateData,
	);

	await transporter.sendMail({
		from: config.smtp_sender,
		to: isExistUser.email,
		subject: "Reset Password",
		html,
	});

	await redisClient.del(key);
};

export const AuthService = {
	registerOTP,
	verifyEmail,
	loginUser,
	getMe,
	refreshToken,
	forgotPassword,
	resetPassword,
};
