import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { reportService } from "./report.service";
import { IRequestUser } from "../../interface";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AppError } from "../../utils/appError";

//& SERVICE REPORT ATTACHMENT
const attachReport = catchAsync(async (req: Request, res: Response) => {
	const files = req.files as
		| { [fieldname: string]: Express.Multer.File[] }
		| undefined;

	const report = files?.["report"]?.[0];

	if (!report) {
		throw new AppError(httpStatus.BAD_REQUEST, "report must be added");
	}

	let data = null;
	if (req.body.data) {
		data = JSON.parse(req.body.data);
	}

	const user = req.user as IRequestUser;

	const result = await reportService.createReport(data, report, user);

	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: `report attached successfully`,
		data: result,
	});
});

//& GET MY REPORTS
const getMyReport = catchAsync(async (req: Request, res: Response) => {
	const query = req.query;
	const user = req.user as IRequestUser;
	const { reports, meta } = await reportService.getMyReport(query, user);

	if (reports.length === 0) {
		return sendResponse(res, {
			statusCode: httpStatus.NOT_FOUND,
			success: false,
			message: `You have no report`,
			data: null,
		});
	}
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `all reports retrived successfully`,
		data: reports,
		meta: meta,
	});
});

//& GET ALL REPORTS
const getAllReport = catchAsync(async (req: Request, res: Response) => {
	const query = req.query;

	const { reports, meta } = await reportService.getAllReport(query);

	if (reports.length === 0) {
		return sendResponse(res, {
			statusCode: httpStatus.NOT_FOUND,
			success: false,
			message: `service report not found`,
			data: null,
		});
	}
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `all reports retrived successfully`,
		data: reports,
		meta: meta,
	});
});

//& UPDATE SERVICE REPORT
const updateReport = catchAsync(async (req: Request, res: Response) => {
	const files = req.files as
		| { [fieldname: string]: Express.Multer.File[] }
		| undefined;

	const report = files?.["report"]?.[0];

	if (!report) {
		throw new AppError(httpStatus.BAD_REQUEST, "report must be added");
	}

	let data = null;
	if (req.body.data) {
		data = JSON.parse(req.body.data);
	}

	const user = req.user as IRequestUser;
	const id = req.params.reportId as string;

	const result = await reportService.updateReport(data, report, id, user);

	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: `report updated successfully`,
		data: result,
	});
});

//& DELETE SERVICE REPORT
const deleteReport = catchAsync(async (req: Request, res: Response) => {
	const user = req.user as IRequestUser;
	const id = req.params.reportId as string;

	await reportService.deleteReport(id, user);

	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: `report deleted successfully`,
		data: null,
	});
});

export const reportController = {
	attachReport,
	getMyReport,
	getAllReport,
	updateReport,
	deleteReport,
};
