import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/appError";
import { IRegisterCustomerPayload, IVerifyEmailPayload } from "./auth.interface";
import httpStatus from 'http-status'
import config from "../../config/env";
import crypto from 'crypto'
import { redisClient } from "../../lib/redis";
import path from 'path'
import ejs from 'ejs'
import { transporter } from "../../lib/nodemailer";
import { UserRole } from "../../../../generated/prisma/enums";
import { jwtUtils } from "../../utils/jwt";
import { SignOptions } from "jsonwebtoken";


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

	const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));

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
		"src/app/template/verificationOTP.ejs",
	);

	const templateData = {
		name,
		otp,
		expire: expirationTime / 60,
    app_name: config.app_name
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
        create: {

        }
      }
		},
		omit: {
			password: true,
		},
    include: {
      customer: true
    }
	});

	const templateData = {
		name: payloadData.name,
    appName: config.app_name
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

	const {customer, ...user } = customerCreated;

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
    customer
	};
};

export const AuthService = {
	registerOTP,
  verifyEmail

};