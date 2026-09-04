import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { serviceService } from "./service.service";
import { IRequestUser } from "../../interface";
import httpStatus from "http-status";
import { sendResponse } from "../../utils/sendResponse";
import { AppError } from "../../utils/appError";

//& CREATE SERVICE REQUEST
const createService = catchAsync(async (req: Request, res: Response) => {
	const body = req.body;
	const user = req.user as IRequestUser;

	const result = await serviceService.createService(body, user);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `service request retrived successfully`,
		data: result,
	});
});

//& GET MY SERVICES
const getMyServices = catchAsync(async (req: Request, res: Response) => {
	const user = req.user as IRequestUser;
	const query = req.query;

	const { services, meta } = await serviceService.getMyServices(query, user);

	if (services.length === 0) {
		throw new AppError(httpStatus.NOT_FOUND, "schedule not found");
	}
	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: "service retrive successfully",
		data: services,
		meta,
	});
});

//& GET ALL SERVICES
const getAllServices = catchAsync(async (req: Request, res: Response) => {
	const user = req.user as IRequestUser;
	const query = req.query;

	const { services, meta } = await serviceService.getALLServices(query, user);

	if (services.length === 0) {
		throw new AppError(httpStatus.NOT_FOUND, "service not found");
	}
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "service retrive successfully",
		data: services,
		meta,
	});
});

export const serviceController = {
	createService,
	getMyServices,
	getAllServices,
};
