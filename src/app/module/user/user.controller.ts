import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { userService } from "./user.service";
import httpStatus from "http-status";
import { AppError } from "../../utils/appError";
import { IRequestUser } from "../../interface";
import { sendResponse } from "../../utils/sendResponse";

//& PROFILE IMAGE UPLOAD
const profileImageUpload = catchAsync(async (req: Request, res: Response) => {
	// console.log('request file ', req.file)

	if (!req.file) {
		throw new AppError(httpStatus.BAD_REQUEST, "No file uploaded");
	}

	const user = req.user as IRequestUser;

	const result = await userService.profileImageUpload(req.file, user);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `profile updated successfully`,
		data: result,
	});
});

export const userController = {
	profileImageUpload,
};
