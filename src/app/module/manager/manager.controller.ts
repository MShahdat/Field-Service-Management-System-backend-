import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { managerService } from "./manager.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { IRequestUser } from "../../interface";

//& APPLY AS A MANAGER
const applyManger = catchAsync(async (req: Request, res: Response) => {
	const body = req.body;
	const result = await managerService.applyManager(body);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `Manager apply successfully`,
		data: result,
	});
});

//& EMAIL VERIFY
const emailVerify = catchAsync(async (req: Request, res: Response) => {
	const body = req.body;

	const result = await managerService.emailVerify(body);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `manager email verified successfully`,
		data: result,
	});
});

//& APPROVE MANAGER
const approveManger = catchAsync(async (req: Request, res: Response) => {
	const body = req.body;
	const user = req.user as IRequestUser;

	const result = await managerService.approveManager(body, user);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `Manager approved/rejected successfully`,
		data: result,
	});
});

//& GET ALL MANAGERS
const getAllMangers = catchAsync(async (req: Request, res: Response) => {
	const query = req.query;

	const { managers, meta } = await managerService.getAllManagers(query);

	if (managers.length === 0) {
		return sendResponse(res, {
			statusCode: httpStatus.NOT_FOUND,
			success: false,
			message: `mangers not found`,
			data: null,
		});
	}
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `managers retrived successfully`,
		data: managers,
		meta: meta,
	});
});

export const managerController = {
	applyManger,
	emailVerify,
	approveManger,
	getAllMangers,
};
