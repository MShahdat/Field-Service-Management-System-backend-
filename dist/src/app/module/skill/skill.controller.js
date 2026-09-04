import { catchAsync } from "../../utils/catchAsync";
import { skillService } from "./skill.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AppError } from "../../utils/appError";
const createSkill = catchAsync(async (req, res) => {
    const body = req.body;
    const user = req.user;
    const result = await skillService.createSkill(body, user);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: `skill created successfully`,
        data: result,
    });
});
const getAllSkill = catchAsync(async (req, res) => {
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
const getSkills = catchAsync(async (req, res) => {
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
const updateSkill = catchAsync(async (req, res) => {
    const id = req.params.skillId;
    const body = req.body;
    const result = await skillService.updateSkill(body, id);
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
