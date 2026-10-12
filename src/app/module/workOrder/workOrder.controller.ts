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


	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "work order retrive successfully",
		data: workOrders,
		meta,
	});
});

//& GET TODAY'S WORKORDERS
const getTodaysWorkOrders = catchAsync(async (req: Request, res: Response) => {
	const user = req.user as IRequestUser;
	const query = req.query;

	const { workOrders, meta } = await workOrderService.getTodaysWorkOrders(
		query,
		user,
	);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "today's work orders retrieve successfully",
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



//& GET SINGLE ORDER BY ID
const getWorkOrder = catchAsync(async (req: Request, res: Response) => {
	const user = req.user as IRequestUser;

	const id = req.params.workOrderId as string

	const result = await workOrderService.getWrokOrder(id, user)

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "work order retrive successfully",
		data: result,
	});
});

export const workOrderController = {
	getMyWorkOrders,
	getNewWorkOrders,
	getTodaysWorkOrders,
	updateStatus,
	getWorkOrder
};
