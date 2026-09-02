import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status'


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
			customer
		},
	});
});




export const authController = {
  registerOTP,
	verifyEmail

}