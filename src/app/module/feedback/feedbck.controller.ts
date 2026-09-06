import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { feedbackService } from "./feedback.service";
import { IRequestUser } from "../../interface";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

//& CREATE
const createFeedback = catchAsync(async (req: Request, res: Response) => {
	const body = req.body;
	const user = req.user as IRequestUser;

	const result = await feedbackService.createFeedback(body, user);

	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: `feedback created successfully`,
		data: result,
	});
});

//& GET BY ID
const getById = catchAsync(async (req: Request, res: Response) => {
	const id = req.params.feedbackId as string;

	const result = await feedbackService.getById(id);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `feedback retrived successfully`,
		data: result,
	});
});

//& GET ALL feedback
const getAllFeedbacks = catchAsync(async (req: Request, res: Response) => {
	const query = req.query;

	const { allFeedback, meta } = await feedbackService.getAllFeedbacks(query);

	if (allFeedback.length === 0) {
		return sendResponse(res, {
			statusCode: httpStatus.NOT_FOUND,
			success: false,
			message: `feedbacks not found`,
			data: null,
		});
	}
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `feedbacks retrived successfully`,
		data: allFeedback,
		meta,
	});
});

//& UPDATE
const updateFeedback = catchAsync(async (req: Request, res: Response) => {
	const id = req.params.feedbackId as string;
	const body = req.body;
	const user = req.user as IRequestUser;

	const result = await feedbackService.updateFeedback(body, id, user);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `feedback updated successfully`,
		data: result,
	});
});

//& DELETE
const deleteFeedback = catchAsync(async (req: Request, res: Response) => {
	const id = req.params.feedbackId as string;
	const user = req.user as IRequestUser;

	const result = await feedbackService.deleteFeedback(id, user);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `feedback deleted successfully`,
		data: result,
	});
});

export const feedbackController = {
	createFeedback,
	getById,
	getAllFeedbacks,
	updateFeedback,
	deleteFeedback,
};
