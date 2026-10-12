import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AppError } from "../../utils/appError";
import httpStatus from "http-status";
import { attachmentService } from "./attachment.service";
import { IRequestUser } from "../../interface";
import { sendResponse } from "../../utils/sendResponse";

//& CREATE ATTACHMENT
const createAttach = catchAsync(async (req: Request, res: Response) => {
	const files = req.files as
		| { [fieldname: string]: Express.Multer.File[] }
		| undefined;

	const attachment = files?.["attachment"] || [];

	if (attachment.length === 0) {
		throw new AppError(httpStatus.BAD_REQUEST, "minimum one file need");
	}

	if (!req.body.data) {
		throw new AppError(httpStatus.BAD_REQUEST, "form data not found");
	}
	const data = JSON.parse(req.body.data);
	const user = req.user as IRequestUser;

	const result = await attachmentService.createAttachment(
		data,
		attachment,
		user,
	);

	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: `attachment created successfully`,
		data: result,
	});
});


//& GET ATTATCHMENTS
const getAttatchments = catchAsync(async (req: Request, res: Response) => {
	const user = req.user as IRequestUser;
	const query = req.query

	const { attachments, meta } = await attachmentService.getAttachments(query, user)

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `attachment updated successfully`,
		data: attachments,
		meta
	});
});


//& UPDATE ATTACH
const updateAttach = catchAsync(async (req: Request, res: Response) => {
	const body = req.body;
	const id = req.params.attachmentId as string;
	const user = req.user as IRequestUser;

	const result = await attachmentService.udpateAttach(body, id, user);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `attachment updated successfully`,
		data: result,
	});
});

//& DELETED ATTACH
const deletedAttach = catchAsync(async (req: Request, res: Response) => {
	const id = req.params.attachmentId as string;
	const user = req.user as IRequestUser;

	await attachmentService.deleteAttach(id, user);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `attatchemnt deleted successfully`,
		data: null,
	});
});

export const attachmentController = {
	createAttach,
	getAttatchments,
	updateAttach,
	deletedAttach,
};
