import { catchAsync } from "../../utils/catchAsync";
import { regionService } from "./region.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AppError } from "../../utils/appError";
//& CREATE REGION (ADMIN)
const createRegion = catchAsync(async (req, res) => {
    const body = req.body;
    const user = req.user;
    const result = await regionService.createRegion(body, user);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "region created successfully",
        data: result,
    });
});
//& GET ALL REGION (ADMIN)
const getAllRegion = catchAsync(async (req, res) => {
    const query = req.query;
    const user = req.user;
    const { area, meta } = await regionService.getAllRegion(query, user);
    if (area.length === 0) {
        throw new AppError(httpStatus.NOT_FOUND, "region not found");
    }
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "region retrive successfully",
        data: area,
        meta,
    });
});
//& UPDATE REGION (ADMIN)
const updateRegion = catchAsync(async (req, res) => {
    const id = req.params.regionId;
    const user = req.user;
    const body = req.body;
    const result = await regionService.updateRegion(body, id, user);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "region updated successfully",
        data: result,
    });
});
export const regionController = {
    createRegion,
    getAllRegion,
    updateRegion,
};
