import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";

import { IRequestUser } from "../../interface";
import httpStatus from "http-status";
import { sendResponse } from "../../utils/sendResponse";
import { analyticsService } from "./analytics.service";

//& GET ADMIN STATS
const getAdminStats = catchAsync(async (req: Request, res: Response) => {
	const result = await analyticsService.getAdminAnalytics();

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Admin analytics retrieved successfully",
		data: result,
	});
});

//& CUSTOMER STATS
const getCustomerStats = catchAsync(async (req: Request, res: Response) => {
	const id = req.user?.userId as string;
	const result = await analyticsService.getCustomerAnalytics(id);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Customer analytics retrieved successfully",
		data: result,
	});
});

//& TECHNICIAN STATS
const getTechnicianStats = catchAsync(async (req: Request, res: Response) => {
	const id = req.user?.userId as string;

	const result = await analyticsService.getTechnicianAnalytics(id);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Technician analytics retrieved successfully",
		data: result,
	});
});

//& MANAGER STATS
const getManagerStats = catchAsync(async (req: Request, res: Response) => {
	const id = req.user?.userId as string;

	const result = await analyticsService.getManagerAnalytics(id);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Manager analytics retrieved successfully",
		data: result,
	});
});

export const analyticsController = {
	getAdminStats,
	getCustomerStats,
	getTechnicianStats,
	getManagerStats,
};
