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

export const attachmentController = {
	createAttach,
};
