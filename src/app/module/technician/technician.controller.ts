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



const getAllTech = catchAsync(async (req: Request, res: Response) => {
	const query = req.query;

	const { technicians, meta } = await technicianService.getAllTech(query);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `technicians retrive successfully`,
		data: technicians,
		meta,
	});
});


const getTechById = catchAsync(async (req: Request, res: Response) => {
	const { technicianId } = req.params;

	const result = await technicianService.getTechById(technicianId as string);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `technician retrive successfully`,
		data: result,
	});
});


export const technicianController = {
	completeProfile,
	getAllTech,
	getTechById
};
