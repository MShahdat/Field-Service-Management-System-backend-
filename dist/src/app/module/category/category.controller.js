import { catchAsync } from "../../utils/catchAsync";
import { categoryService } from "./category.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AppError } from "../../utils/appError";
//& CREATE CATEGORY
const createCategory = catchAsync(async (req, res) => {
    const body = req.body;
    const user = req.user;
    const result = await categoryService.createCategory(body, user);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: `category created successfully`,
        data: result,
    });
});
//& GET ALL CATEGORY (ADMIN)
const getAllCategory = catchAsync(async (req, res) => {
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
const getCategories = catchAsync(async (req, res) => {
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
const udpateCategory = catchAsync(async (req, res) => {
    const id = req.params.categoryId;
    const body = req.body;
    const result = await categoryService.udpateCategory(body, id);
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
