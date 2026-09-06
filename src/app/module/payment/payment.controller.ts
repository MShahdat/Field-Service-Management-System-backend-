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

//& GET MY PAYMENT
const getMyPayment = catchAsync(async (req: Request, res: Response) => {
	const user = req.user!;
	const query = req.query;

	const { payment, meta } = await paymentService.getMyPayment(query, user);

	if (payment.length === 0) {
		throw new AppError(httpStatus.NOT_FOUND, "payments not found");
	}

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `payment retrive successfully`,
		data: payment,
		meta,
	});
});

//& GET TECHNICIAN PAYMENT
const getTechPayment = catchAsync(async (req: Request, res: Response) => {
	const user = req.user!;
	const query = req.query;

	const { payment, meta } = await paymentService.getTechnicianPayment(
		query,
		user,
	);

	if (payment.length === 0) {
		throw new AppError(httpStatus.NOT_FOUND, "payments not found");
	}

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `payment retrive successfully`,
		data: payment,
		meta,
	});
});

//& GET MANAGER PAYMENT
const getManagerPayment = catchAsync(async (req: Request, res: Response) => {
	const user = req.user!;
	const query = req.query;

	const { payment, meta } = await paymentService.getManagerPayment(query, user);

	if (payment.length === 0) {
		throw new AppError(httpStatus.NOT_FOUND, "payments not found");
	}

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `payment retrive successfully`,
		data: payment,
		meta,
	});
});

//& GET ALL PAYMENTS
const getAllPayments = catchAsync(async (req: Request, res: Response) => {
	const query = req.query;

	const { payment, meta } = await paymentService.getAllPayments(query);

	if (payment.length === 0) {
		throw new AppError(httpStatus.NOT_FOUND, "payments not found");
	}

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
	getMyPayment,
	getTechPayment,
	getManagerPayment,
	getAllPayments,
};
