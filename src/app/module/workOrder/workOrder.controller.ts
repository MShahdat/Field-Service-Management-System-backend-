import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { IRequestUser } from "../../interface";
import { AppError } from "../../utils/appError";
import { workOrderService } from "./workOrder.service";

//& GET MY WORKORDERS
const getMyWorkOrders = catchAsync(async (req: Request, res: Response) => {
	const user = req.user as IRequestUser;
	const query = req.query;

	const { workOrders, meta } = await workOrderService.getMyWrokOrders(
		query,
		user,
	);

	if (workOrders.length === 0) {
		throw new AppError(httpStatus.NOT_FOUND, "my work order not found");
	}
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "work order retrive successfully",
		data: workOrders,
		meta,
	});
});

//& GET NEW WORKORDERS
const getNewWorkOrders = catchAsync(async (req: Request, res: Response) => {
	const user = req.user as IRequestUser;
	const query = req.query;

	const { workOrders, meta } = await workOrderService.getNewWrokOrders(
		query,
		user,
	);

	if (workOrders.length === 0) {
		throw new AppError(httpStatus.NOT_FOUND, "new incomming order not found");
	}
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "work order retrive successfully",
		data: workOrders,
		meta,
	});
});

//& GET UPDATE STATUS
const updateStatus = catchAsync(async (req: Request, res: Response) => {
	const user = req.user as IRequestUser;

	const body = req.body;

	const result = await workOrderService.udpateStatus(body, user);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "work order status successfully",
		data: result,
	});
});

export const workOrderController = {
	getMyWorkOrders,
	getNewWorkOrders,
	updateStatus,
};
