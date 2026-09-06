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

//& GET MY ATTACH
const getMyAttach = catchAsync(async (req: Request, res: Response) => {
	const query = req.query;
	const user = req.user as IRequestUser;
	const { attachments, meta } = await attachmentService.getMyAttach(
		query,
		user,
	);

	if (attachments.length === 0) {
		return sendResponse(res, {
			statusCode: httpStatus.NOT_FOUND,
			success: false,
			message: `You have no attach files`,
			data: null,
		});
	}
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `all attachments retrived successfully`,
		data: attachments,
		meta: meta,
	});
});

//& GET MY ATTACH
const getAttachTech = catchAsync(async (req: Request, res: Response) => {
	const query = req.query;
	const user = req.user as IRequestUser;

	const { attachments, meta } = await attachmentService.getTechnicianAttach(
		query,
		user,
	);

	if (attachments.length === 0) {
		return sendResponse(res, {
			statusCode: httpStatus.NOT_FOUND,
			success: false,
			message: `You have no attach files`,
			data: null,
		});
	}
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `all attachments retrived successfully`,
		data: attachments,
		meta: meta,
	});
});

//& GET MY ATTACH
const getAttachManager = catchAsync(async (req: Request, res: Response) => {
	const query = req.query;
	const user = req.user as IRequestUser;

	const { attachments, meta } = await attachmentService.getManager(query, user);

	if (attachments.length === 0) {
		return sendResponse(res, {
			statusCode: httpStatus.NOT_FOUND,
			success: false,
			message: `You have no attach files`,
			data: null,
		});
	}
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `all attachments retrived successfully`,
		data: attachments,
		meta: meta,
	});
});

//& GET MY ATTACH
const getAllTech = catchAsync(async (req: Request, res: Response) => {
	const query = req.query;

	const { attachments, meta } = await attachmentService.getAllAttach(query);

	if (attachments.length === 0) {
		return sendResponse(res, {
			statusCode: httpStatus.NOT_FOUND,
			success: false,
			message: `attachment not found`,
			data: null,
		});
	}
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `all attachments retrived successfully`,
		data: attachments,
		meta: meta,
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

//& GET SOFT DELETED ATTACH
const deletedAttach = catchAsync(async (req: Request, res: Response) => {
	const id = req.params.attachmentId as string;
	const user = req.user as IRequestUser;

	const result = await attachmentService.deleteAttach(id, user);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `soft deleted successfully`,
		data: null,
	});
});

export const attachmentController = {
	createAttach,
	getMyAttach,
	getAttachTech,
	getAttachManager,
	getAllTech,
	updateAttach,
	deletedAttach,
};
