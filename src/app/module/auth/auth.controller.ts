import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { IRequestUser } from "../../interface";
import { AppError } from "../../utils/appError";

//& REGISTER USER
const registerOTP = catchAsync(async (req: Request, res: Response) => {
	const payload = req.body;
	await AuthService.registerOTP(payload);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Register  OTP send successfully",
		data: null,
	});
});

//& VERIFY EMAIL
const verifyEmail = catchAsync(async (req: Request, res: Response) => {
	const payload = req.body;
	const result = await AuthService.verifyEmail(payload);

	const { user, customer, accessToken, refreshToken } = result;

	res.cookie("accessToken", accessToken, {
		httpOnly: true,
		secure: false,
		sameSite: "none",
		maxAge: 1000 * 60 * 60 * 24, // 24 hour or 1 day
	});
	res.cookie("refreshToken", refreshToken, {
		httpOnly: true,
		secure: false,
		sameSite: "none",
		maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
	});

	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: "Customer created successfully",
		data: {
			accessToken,
			refreshToken,
			user,
			customer,
		},
	});
});

//& LOGIN USER
const loginUser = catchAsync(async (req: Request, res: Response) => {
	const payload = req.body;
	const result = await AuthService.loginUser(payload);
	const { accessToken, refreshToken } = result;

	res.cookie("accessToken", accessToken, {
		httpOnly: true,
		secure: false,
		sameSite: "none",
		maxAge: 1000 * 60 * 60 * 24, // 24 hour or 1 day
	});
	res.cookie("refreshToken", refreshToken, {
		httpOnly: true,
		secure: false,
		sameSite: "none",
		maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
	});

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "User logged in successfully",
		data: {
			accessToken,
			refreshToken,
		},
	});
});

//& GET ME
const getMe = catchAsync(async (req: Request, res: Response) => {
	const user = req.user as unknown as IRequestUser;

	if (!user) {
		throw new AppError(
			httpStatus.UNAUTHORIZED,
			"User information is missing in the request",
		);
	}

	const result = await AuthService.getMe(user);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "User profile fetched successfully",
		data: result,
	});
});

//& CREATE ACCESS TOKEN
const refreshToken = catchAsync(async (req: Request, res: Response) => {
	if (!req.cookies.refreshToken) {
		throw new AppError(httpStatus.UNAUTHORIZED, "Refresh token is missing");
	}
	const result = await AuthService.refreshToken(req.cookies.refreshToken);
	const { accessToken, refreshToken: newRefreshToken } = result;

	res.cookie("accessToken", accessToken, {
		httpOnly: true,
		secure: false,
		sameSite: "none",
		maxAge: 1000 * 60 * 60 * 24, // 24 hour or 1 day
	});
	res.cookie("refreshToken", newRefreshToken, {
		httpOnly: true,
		secure: false,
		sameSite: "none",
		maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
	});

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "New tokens generated successfully",
		data: {
			accessToken,
			refreshToken: newRefreshToken,
		},
	});
});

//& FORGOT PASSWORD
const forgotPassword = catchAsync(async (req: Request, res: Response) => {
	const body = req.body;

	await AuthService.forgotPassword(body);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `OTP send successfully email: ${body.email}`,
		data: null,
	});
});

//& RESET PASSWORD
const resetPassword = catchAsync(async (req: Request, res: Response) => {
	const body = req.body;

	await AuthService.resetPassword(body);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Password reset successfully",
		data: null,
	});
});

export const authController = {
	registerOTP,
	verifyEmail,
	loginUser,
	getMe,
	refreshToken,
	forgotPassword,
	resetPassword,
};
