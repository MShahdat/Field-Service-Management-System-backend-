import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { paymentService } from "./payment.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AppError } from "../../utils/appError";

//& PAYMENT CREATE
const createpayment = catchAsync(async (req: Request, res: Response) => {
	const body = req.body;
	const user = req.user!;

	const result = await paymentService.createPayment(body, user);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `payment url created successfully`,
		data: result,
	});
});

//& BKASH CALLBACK
const bkashCallback = catchAsync(async (req: Request, res: Response) => {
	const query = req.query;

	const { result, redirectUrl } = await paymentService.bkashCallback(query);

	res.redirect(redirectUrl);

	console.log("payment result = ", result);
});

//& GET PAYMENT INFO (ALL LOGGED-IN USERS, ROLE-FILTERED)
const getPaymentInfo = catchAsync(async (req: Request, res: Response) => {
	const user = req.user!;
	const query = req.query;

	const { payment, meta } = await paymentService.getPaymentInfo(query, user);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `payment retrive successfully`,
		data: payment,
		meta,
	});
});

export const paymentController = {
	createpayment,
	bkashCallback,
	getPaymentInfo,
};
