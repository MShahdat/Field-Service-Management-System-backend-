import { UploadApiResponse } from "cloudinary";
import { IQuery, IRequestUser } from "../../interface";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/appError";
import { IReportPayload, IUpdateReportPayload } from "./report.interface";
import httpStatus from "http-status";
import { Cloudinary } from "../../lib/cloudinary";
import { ServiceReportWhereInput } from "../../../../generated/prisma/models";

//& CREATE SERVICE REPORT
const createReport = async (
	payload: IReportPayload,
	report: Express.Multer.File,
	user: IRequestUser,
) => {
	const isTech = await prisma.technicianProfile.findUnique({
		where: {
			userId: user.userId,
		},
		include: {
			user: true,
		},
	});

	if (!isTech) {
		throw new AppError(httpStatus.NOT_FOUND, "technician not found");
	}

	const isWrokOrder = await prisma.workOrder.findUnique({
		where: {
			id: payload.workOrderId,
			technicianId: isTech.id,
		},
	});

	if (!isWrokOrder) {
		throw new AppError(httpStatus.NOT_FOUND, "work order not found");
	}

	if (isWrokOrder.status !== "COMPLETED") {
		throw new AppError(
			httpStatus.BAD_REQUEST,
			`you can't attach summary report before completed work`,
		);
	}

	const reportRes = await new Promise<UploadApiResponse>((resolve, reject) => {
		Cloudinary.cloudinary.uploader
			.upload_stream(
				{
					folder: "Field-Service-Management/Service/Report",
					resource_type: "auto",
				},
				async (error, result) => {
					if (error) {
						return reject(error);
					}
					if (!result) {
						return reject(
							new AppError(
								httpStatus.BAD_GATEWAY,
								"No result returned from cloudinary",
							),
						);
					}
					return resolve(result);
				},
			)
			.end(report?.buffer);
	});

	const attachReport = await prisma.serviceReport.create({
		data: {
			...payload,
			reportUrl: reportRes.secure_url,
			reportPublicId: reportRes.public_id,
		},
		include: {
			workOrder: true,
		},
	});

	return attachReport;
};

//& GEL MY REPORT (TECH)
const getMyReport = async (query: IQuery, user: IRequestUser) => {
	const sort = query.sortBy ? query.sortBy : "createdAt";
	const order = query.sortOrder ? query.sortOrder : "desc";
	const page = Number(query.page || 1);
	const limit = Number(query.limit || 20);

	const isTech = await prisma.technicianProfile.findUnique({
		where: {
			userId: user.userId,
		},
	});

	if (!isTech) {
		throw new AppError(httpStatus.NOT_FOUND, "technician not found");
	}

	const andConditions: ServiceReportWhereInput[] = [
		{
			workOrder: {
				technicianId: isTech.id,
			},
		},
	];

	//~ searching
	if (query.search) {
		andConditions.push({
			OR: [
				{
					workOrder: {
						manager: {
							user: {
								name: {
									contains: query.search,
									mode: "insensitive",
								},
							},
						},
					},
				},
				{
					workOrder: {
						technician: {
							user: {
								name: {
									contains: query.search,
									mode: "insensitive",
								},
							},
						},
					},
				},
			],
		});
	}

	//~ filtering

	if (query.region) {
		const region = query.region as string;
		const arr = region.split(",").map((item) => item.trim());

		andConditions.push({
			workOrder: {
				region: {
					area: { in: arr },
				},
			},
		});
	}

	if (query.isDelete) {
		andConditions.push({
			isDelete: query.isDelete,
		});
	}
	const reports = await prisma.serviceReport.findMany({
		where: {
			AND: andConditions,
		},
		take: limit,
		skip: (page - 1) * limit,
		orderBy: {
			[sort]: order,
		},
		include: {
			workOrder: true,
		},
	});

	const total = await prisma.serviceReport.count({
		where: {
			AND: andConditions,
		},
	});

	const meta = {
		total,
		page,
		limit,
		totalPages: Math.ceil(total / limit),
	};

	return {
		reports,
		meta,
	};
};

//& GEL ALL REPORTS (ADMIN)
const getAllReport = async (query: IQuery) => {
	const sort = query.sortBy ? query.sortBy : "createdAt";
	const order = query.sortOrder ? query.sortOrder : "desc";
	const page = Number(query.page || 1);
	const limit = Number(query.limit || 20);

	const andConditions: ServiceReportWhereInput[] = [];

	//~ searching
	if (query.search) {
		andConditions.push({
			OR: [
				{
					workOrder: {
						manager: {
							user: {
								name: {
									contains: query.search,
									mode: "insensitive",
								},
							},
						},
					},
				},
				{
					workOrder: {
						technician: {
							user: {
								name: {
									contains: query.search,
									mode: "insensitive",
								},
							},
						},
					},
				},
				{
					workOrder: {
						customer: {
							user: {
								name: {
									contains: query.search,
									mode: "insensitive",
								},
							},
						},
					},
				},
			],
		});
	}

	//~ filtering

	if (query.region) {
		const region = query.region as string;
		const arr = region.split(",").map((item) => item.trim());

		andConditions.push({
			workOrder: {
				region: {
					area: { in: arr },
				},
			},
		});
	}

	if (query.isDelete) {
		andConditions.push({
			isDelete: query.isDelete,
		});
	}

	const reports = await prisma.serviceReport.findMany({
		where: {
			AND: andConditions,
		},
		take: limit,
		skip: (page - 1) * limit,
		orderBy: {
			[sort]: order,
		},
		include: {
			workOrder: true,
		},
	});

	const total = await prisma.serviceReport.count({
		where: {
			AND: andConditions,
		},
	});

	const meta = {
		total,
		page,
		limit,
		totalPages: Math.ceil(total / limit),
	};

	return {
		reports,
		meta,
	};
};

//& UPDATE SERVICE REPORT
const updateReport = async (
	payload: IUpdateReportPayload,
	report: Express.Multer.File,
	id: string,
	user: IRequestUser,
) => {
	const isUser = await prisma.user.findUnique({
		where: {
			id: user.userId,
		},
		include: {
			technician: true,
		},
	});

	if (!isUser) {
		throw new AppError(httpStatus.NOT_FOUND, "user not found");
	}

	const isReport = await prisma.serviceReport.findUnique({
		where: {
			id,
		},
		include: {
			workOrder: true,
		},
	});

	if (!isReport) {
		throw new AppError(httpStatus.NOT_FOUND, "service report not found");
	}

	if (isReport.isDelete) {
		throw new AppError(httpStatus.BAD_REQUEST, "service report deleted");
	}

	if (user.role === "TECHNICIAN") {
		if (isReport.workOrder.technicianId !== isUser.technician?.id) {
			throw new AppError(httpStatus.UNAUTHORIZED, "you can not update");
		}
	}

	const reportRes = await new Promise<UploadApiResponse>((resolve, reject) => {
		Cloudinary.cloudinary.uploader
			.upload_stream(
				{
					folder: "Field-Service-Management/Service/Report",
					resource_type: "auto",
				},
				async (error, result) => {
					if (error) {
						return reject(error);
					}
					if (!result) {
						return reject(
							new AppError(
								httpStatus.BAD_GATEWAY,
								"No result returned from cloudinary",
							),
						);
					}
					return resolve(result);
				},
			)
			.end(report?.buffer);
	});

	const udpatedReport = await prisma.serviceReport.update({
		where: {
			id: isReport.id,
		},
		data: {
			...payload,
			reportUrl: reportRes.secure_url,
			reportPublicId: reportRes.public_id,
		},
		include: {
			workOrder: true,
		},
	});

	await Cloudinary.cloudinary.uploader.destroy(isReport.reportPublicId);
	console.log("report deleted from cloudinary");

	return udpatedReport;
};

//& SOFT DELETE SERVICE REPORT
const deleteReport = async (id: string, user: IRequestUser) => {
	const isUser = await prisma.user.findUnique({
		where: {
			id: user.userId,
		},
		include: {
			technician: true,
		},
	});

	if (!isUser) {
		throw new AppError(httpStatus.NOT_FOUND, "user not found");
	}

	const isReport = await prisma.serviceReport.findUnique({
		where: {
			id,
		},
		include: {
			workOrder: true,
		},
	});

	if (!isReport) {
		throw new AppError(httpStatus.NOT_FOUND, "service report not found");
	}

	if (isReport.isDelete) {
		throw new AppError(
			httpStatus.BAD_REQUEST,
			"service report already deleted deleted",
		);
	}

	if (user.role === "TECHNICIAN") {
		if (isReport.workOrder.technicianId !== isUser.technician?.id) {
			throw new AppError(httpStatus.UNAUTHORIZED, "you can not delete");
		}
	}

	await prisma.serviceReport.update({
		where: {
			id: isReport.id,
		},
		data: {
			isDelete: true,
			deletedAt: new Date(),
		},
	});

	await Cloudinary.cloudinary.uploader.destroy(isReport.reportPublicId);
	console.log("report deleted from cloudinary");
};

export const reportService = {
	createReport,
	getMyReport,
	getAllReport,
	updateReport,
	deleteReport,
};
