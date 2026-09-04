import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/appError";
import httpStatus from "http-status";
export const zodValidation = (zodSchema) => {
    return catchAsync((req, res, next) => {
        const payload = zodSchema.safeParse(req.body);
        if (!payload.success) {
            console.log(payload.error.issues);
            throw new AppError(httpStatus.BAD_REQUEST, payload.error.issues[0].message);
        }
        req.body = payload.data;
        next();
    });
};
