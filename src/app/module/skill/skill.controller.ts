import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { skillService } from "./skill.service";
import { IRequestUser } from "../../interface";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AppError } from "../../utils/appError";

//& CREATE SKILL
const createSkill = catchAsync(async (req: Request, res: Response) => {
	const body = req.body;
	const user = req.user as IRequestUser;

	const result = await skillService.createSkill(body, user);
	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: `skill created successfully`,
		data: result,
	});
});

//& GET ALL SKILL
const getAllSkill = catchAsync(async (req: Request, res: Response) => {
	const query = req.query;

	const { skill, meta } = await skillService.getAllSkill(query);

	if (skill.length === 0) {
		throw new AppError(httpStatus.NOT_FOUND, "skill not found");
	}

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `skill retrive successfully`,
		data: skill,
		meta,
	});
});

//& GET ALL SKILL
const getSkills = catchAsync(async (req: Request, res: Response) => {
	const query = req.query;

	const { skill, meta } = await skillService.getSkills(query);

	if (skill.length === 0) {
		throw new AppError(httpStatus.NOT_FOUND, "skill not found");
	}

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `skill retrive successfully`,
		data: skill,
		meta,
	});
});

//& UPDATE SKILL
const updateSkill = catchAsync(async (req: Request, res: Response) => {
	const id = req.params.skillId;
	const body = req.body;

	const result = await skillService.updateSkill(body, id as string);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `skill updated successfully`,
		data: result,
	});
});

export const skillController = {
	createSkill,
	getAllSkill,
	getSkills,
	updateSkill,
};
