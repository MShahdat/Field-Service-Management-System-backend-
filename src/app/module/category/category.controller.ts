import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { categoryService } from "./category.service";
import { IRequestUser } from "../../interface";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AppError } from "../../utils/appError";

//& CREATE CATEGORY
const createCategory = catchAsync(async (req: Request, res: Response) => {
	const body = req.body;
	const user = req.user as IRequestUser;

	const result = await categoryService.createCategory(body, user);
	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: `category created successfully`,
		data: result,
	});
});

//& GET ALL CATEGORY (ADMIN)
const getAllCategory = catchAsync(async (req: Request, res: Response) => {
	const query = req.query;

	const { category, meta } = await categoryService.getAllCategory(query);

	if (category.length === 0) {
		throw new AppError(httpStatus.NOT_FOUND, "category not found");
	}

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `category retrive successfully`,
		data: category,
		meta,
	});
});

//& GET ALL CATEGORY (PUBLIC)
const getCategories = catchAsync(async (req: Request, res: Response) => {
	const query = req.query;

	const { category, meta } = await categoryService.getCategories(query);

	if (category.length === 0) {
		throw new AppError(httpStatus.NOT_FOUND, "category not found");
	}

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `category retrive successfully`,
		data: category,
		meta,
	});
});

//& UPDATE CATEGORY (ADMIN)
const udpateCategory = catchAsync(async (req: Request, res: Response) => {
	const id = req.params.categoryId;
	const body = req.body;

	const result = await categoryService.udpateCategory(body, id as string);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `category updated successfully`,
		data: result,
	});
});

export const categoryController = {
	createCategory,
	getAllCategory,
	getCategories,
	udpateCategory,
};
