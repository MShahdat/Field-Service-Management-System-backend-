import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { scheduleService } from "./schedule.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { IRequestUser } from "../../interface";

//& GET ALL SCHEDULE (ADMIN)
const getAllSchedule = catchAsync(async (req: Request, res: Response) => {
	const query = req.query;

	const { schedules, meta } = await scheduleService.getAllSchedule(query);

	if (schedules.length === 0) {
		return sendResponse(res, {
			statusCode: httpStatus.NOT_FOUND,
			success: false,
			message: `scheule not found`,
			data: null,
		});
	}
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `all scheudle retrived successfully`,
		data: schedules,
		meta: meta,
	});
});

//& GET ALL SCHEDULE (TECH)
const getSchedulesTech = catchAsync(async (req: Request, res: Response) => {
	const query = req.query;
	const user = req.user as IRequestUser;
	const { schedules, meta } = await scheduleService.getScheduleTech(
		query,
		user,
	);

	if (schedules.length === 0) {
		return sendResponse(res, {
			statusCode: httpStatus.NOT_FOUND,
			success: false,
			message: `schedule not found`,
			data: null,
		});
	}
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `schudel retrived successfully`,
		data: schedules,
		meta: meta,
	});
});

//& GET single
const singleSchedule = catchAsync(async (req: Request, res: Response) => {
	const user = req.user as IRequestUser;
	const id = req.params.scheduleId as string;

	const result = await scheduleService.singleSchedule(id, user);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `scheule retrived successfully`,
		data: result,
	});
});

export const scheduleController = {
	getAllSchedule,
	getSchedulesTech,
	singleSchedule,
};
