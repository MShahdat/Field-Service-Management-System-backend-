import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { serviceService } from "./service.service";
import { IRequestUser } from "../../interface";
import httpStatus from "http-status";
import { sendResponse } from "../../utils/sendResponse";
import { AppError } from "../../utils/appError";

//& CREATE SERVICE REQUEST
const createService = catchAsync(async (req: Request, res: Response) => {
	const body = req.body;
	const user = req.user as IRequestUser;

	const result = await serviceService.createService(body, user);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `service request retrived successfully`,
		data: result,
	});
});




//& UPDATE SERVICE REQUEST
const updateService = catchAsync(async (req: Request, res: Response) => {
	const body = req.body;
	const user = req.user as IRequestUser;
	const serviceId = req.params.serviceId as string;

	const result = await serviceService.updateService(serviceId, body, user);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "service updated successfully",
		data: result,
	});
});


//& GET MY SERVICES
const getMyServices = catchAsync(async (req: Request, res: Response) => {
	const user = req.user as IRequestUser;
	const query = req.query;

	const { data, meta } = await serviceService.getMyServices(query, user);

	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: "service retrive successfully",
		data,
		meta,
	});
});

//& GET ALL SERVICES
const getAllServices = catchAsync(async (req: Request, res: Response) => {
	const user = req.user as IRequestUser;
	const query = req.query;

	const { data, meta } = await serviceService.getALLServices(query, user);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "service retrive successfully",
		data,
		meta,
	});
});


//& GET MY REGION SERVICES
const getMyRegionServices = catchAsync(async (req: Request, res: Response) => {
	const user = req.user as IRequestUser;
	const query = req.query;

	const { data, meta } = await serviceService.getMyRegionServices(
		query,
		user,
	);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "service retrive successfully",
		data,
		meta,
	});
});



//& GET SINGLE SERVICES
const getSingleService = catchAsync(async (req: Request, res: Response) => {
	const user = req.user as IRequestUser;
	const id = req.params.serviceId as string;

	const result = await serviceService.getSingleService(id, user);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "service retrive successfully",
		data: result,
	});
});

// //& REVIEW SERVICE (MANAGER)
// const reviewService = catchAsync(async (req: Request, res: Response) => {
// 	const user = req.user as IRequestUser;
// 	const body = req.body;

// 	const result = await serviceService.reviewService(body, user);

// 	sendResponse(res, {
// 		statusCode: httpStatus.OK,
// 		success: true,
// 		message: "service reviewed successfully",
// 		data: result,
// 	});
// });

//& ELIGIBLE TECHNICIAN (MANAGER)
const getEligibleTechnicians = catchAsync(
	async (req: Request, res: Response) => {
		const user = req.user as IRequestUser;
		const id = req.params.workOrderId as string;

		const result = await serviceService.getEligibleTechnicians(id, user);

		sendResponse(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: "eligible technician find successfully",
			data: result,
		});
	},
);

//& ASSIGN TECHNICIAN (MANAGER)
const assignTechnician = catchAsync(async (req: Request, res: Response) => {
	const user = req.user as IRequestUser;
	const body = req.body;

	const result = await serviceService.assignTechnician(body, user);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message:
			body.status === "REJECTED"
				? "Service rejected successfully"
				: "Technician assigned successfully",
		data: result,
	});
});



//& SOFT DELETE SERVICE (CUSTOMER)
const softDelete = catchAsync(async (req: Request, res: Response) => {
	const user = req.user as IRequestUser;
	const serviceId = req.params.serviceId as string;

	await serviceService.softDelete(serviceId, user);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "service deleted successfully",
		data: null,
	});
});


export const serviceController = {
	createService,
	getMyServices,
	getAllServices,
	getSingleService,
	getEligibleTechnicians,
	assignTechnician,
	updateService,
	softDelete,
	getMyRegionServices,

};
