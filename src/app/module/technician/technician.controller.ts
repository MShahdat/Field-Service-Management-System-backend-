import { Request, Response } from "express";
import httpStatus from "http-status";
import { technicianService } from "./technician.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { IRequestUser } from "../../interface";
import { AppError } from "../../utils/appError";

//& COMPLETE TECHNICIAN PROFILE
const completeProfile = catchAsync(async (req: Request, res: Response) => {
	const user = req.user as IRequestUser;

	const result = await technicianService.completeProfile(req.body, user);

	if (!result) {
		throw new AppError(
			httpStatus.INTERNAL_SERVER_ERROR,
			"something went wrong",
		);
	}

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: result.isProfileCompleted
			? "Technician profile completed successfully"
			: "Technician profile updated successfully",
		data: result,
	});
});

export const technicianController = {
	completeProfile,
};
