import { UploadApiResponse } from "cloudinary";
import { IQuery, IRequestUser } from "../../interface";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/appError";
import {
	IAttachmentPayload,
	IUpdateAttachmentPayload,
} from "./attachment.interface";
import httpStatus from "http-status";
import { Cloudinary } from "../../lib/cloudinary";
import { AttachmentWhereInput } from "../../../../generated/prisma/models";

//& CREATE ATTACHMENT
const createAttachment = async (
	payload: IAttachmentPayload,
	files: Express.Multer.File[],
	user: IRequestUser,
) => {
	const isUser = await prisma.user.findUnique({
		where: {
			id: user.userId,
		},
		include: {
			manager: true,
			technician: true,
			customer: true,
		},
	});

	if (!isUser) {
		throw new AppError(httpStatus.NOT_FOUND, "user not found");
	}

	const isWrokOrder = await prisma.workOrder.findUnique({
		where: {
			id: payload.workOrderId,
		},
		include: {
			technician: true,
			manager: true,
			customer: true,
		},
	});

	if (!isWrokOrder) {
		throw new AppError(httpStatus.NOT_FOUND, "work order not found");
	}

	if (
		isWrokOrder.status === "CANCELLED" ||
		isWrokOrder.status === "SCHEDULED"
	) {
		throw new AppError(
			httpStatus.BAD_REQUEST,
			"you can not attached any files",
		);
	}

	if (user.role === "CUSTOMER") {
		if (isWrokOrder.customerId !== isUser.customer?.id) {
			throw new AppError(httpStatus.UNAUTHORIZED, "you can not attach files");
		}
	}

	if (user.role === "MANAGER") {
		if (isWrokOrder.managerId !== isUser.manager?.id) {
			throw new AppError(httpStatus.UNAUTHORIZED, "you can not attach files");
		}
	}

	if (user.role === "TECHNICIAN") {
		if (isWrokOrder.technicianId !== isUser.technician?.id) {
			throw new AppError(httpStatus.UNAUTHORIZED, "you can not attach files");
		}
	}

	const filesRes = await Promise.all(
		files.map((file) => {
			return new Promise<UploadApiResponse>((resolve, reject) => {
				Cloudinary.cloudinary.uploader
					.upload_stream(
						{
							folder: "Field-Service-Management/Service/Attachment",
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
					.end(file?.buffer);
			});
		}),
	);

	const createAttach = await prisma.attachment.create({
		data: {
			...payload,
			files: filesRes.map((file) => ({
				url: file.secure_url,
				publicId: file.public_id,
			})),
		},
		include: {
			workOrder: true,
		},
	});

	return createAttach;
};

//& GEL MY ATTACHMENTS (CUSTOMER)
const getMyAttach = async (query: IQuery, user: IRequestUser) => {
	const sort = query.sortBy ? query.sortBy : "createdAt";
	const order = query.sortOrder ? query.sortOrder : "desc";
	const page = Number(query.page || 1);
	const limit = Number(query.limit || 20);

	const isCustomer = await prisma.customerProfile.findUnique({
		where: {
			userId: user.userId,
		},
	});

	if (!isCustomer) {
		throw new AppError(httpStatus.NOT_FOUND, "customer not found");
	}

	const andConditions: AttachmentWhereInput[] = [
		{
			workOrder: {
				customerId: isCustomer.id,
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

	const attachments = await prisma.attachment.findMany({
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

	const total = await prisma.attachment.count({
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
		attachments,
		meta,
	};
};

//& GEL MY ATTACHMENTS (MANAGER)
const getManager = async (query: IQuery, user: IRequestUser) => {
	const sort = query.sortBy ? query.sortBy : "createdAt";
	const order = query.sortOrder ? query.sortOrder : "desc";
	const page = Number(query.page || 1);
	const limit = Number(query.limit || 20);

	const isManger = await prisma.managerProfile.findUnique({
		where: {
			userId: user.userId,
		},
	});

	if (!isManger) {
		throw new AppError(httpStatus.NOT_FOUND, "manager not found");
	}

	const andConditions: AttachmentWhereInput[] = [
		{
			workOrder: {
				managerId: isManger.id,
			},
		},
	];

	//~ searching
	if (query.search) {
		andConditions.push({
			OR: [
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

	if (query.isDelete) {
		andConditions.push({
			isDelete: query.isDelete,
		});
	}

	const attachments = await prisma.attachment.findMany({
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

	const total = await prisma.attachment.count({
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
		attachments,
		meta,
	};
};

//& GEL MY ATTACHMENTS (TECHNICIAN)
const getTechnicianAttach = async (query: IQuery, user: IRequestUser) => {
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

	const andConditions: AttachmentWhereInput[] = [
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

	const attachments = await prisma.attachment.findMany({
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

	const total = await prisma.attachment.count({
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
		attachments,
		meta,
	};
};

//& GEL ALL ATTACHMENT (ADMIN)
const getAllAttach = async (query: IQuery) => {
	const sort = query.sortBy ? query.sortBy : "createdAt";
	const order = query.sortOrder ? query.sortOrder : "desc";
	const page = Number(query.page || 1);
	const limit = Number(query.limit || 20);

	const andConditions: AttachmentWhereInput[] = [];

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

	const attachments = await prisma.attachment.findMany({
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

	const total = await prisma.attachment.count({
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
		attachments,
		meta,
	};
};

//& UPDATE ATTACHMENT
const udpateAttach = async (
	payload: IUpdateAttachmentPayload,
	id: string,
	user: IRequestUser,
) => {
	const isUser = await prisma.user.findUnique({
		where: {
			id: user.userId,
		},
		include: {
			technician: true,
			customer: true,
			manager: true,
		},
	});

	if (!isUser) {
		throw new AppError(httpStatus.NOT_FOUND, "user not found");
	}
	const attachment = await prisma.attachment.findUnique({
		where: {
			id,
		},
		include: {
			workOrder: {
				include: {
					service: true,
				},
			},
		},
	});

	if (!attachment) {
		throw new AppError(httpStatus.NOT_FOUND, "Attachment not found");
	}

	if (user.role === "CUSTOMER") {
		if (attachment.workOrder.customerId !== isUser.customer?.id) {
			throw new AppError(httpStatus.UNAUTHORIZED, "you can not attach files");
		}
	}

	if (user.role === "MANAGER") {
		if (attachment.workOrder.managerId !== isUser.manager?.id) {
			throw new AppError(httpStatus.UNAUTHORIZED, "you can not attach files");
		}
	}

	if (user.role === "TECHNICIAN") {
		if (attachment.workOrder.technicianId !== isUser.technician?.id) {
			throw new AppError(httpStatus.UNAUTHORIZED, "you can not attach files");
		}
	}

	const updated = await prisma.attachment.update({
		where: {
			id: attachment.id,
		},
		data: {
			...payload,
		},
	});

	return updated;
};

//& UPDATE ATTACHMENT
const deleteAttach = async (id: string, user: IRequestUser) => {
	const isUser = await prisma.user.findUnique({
		where: {
			id: user.userId,
		},
		include: {
			technician: true,
			customer: true,
			manager: true,
		},
	});

	if (!isUser) {
		throw new AppError(httpStatus.NOT_FOUND, "user not found");
	}
	const attachment = await prisma.attachment.findUnique({
		where: {
			id,
		},
		include: {
			workOrder: {
				include: {
					service: true,
				},
			},
		},
	});

	if (!attachment) {
		throw new AppError(httpStatus.NOT_FOUND, "Attachment not found");
	}

	if (user.role === "CUSTOMER") {
		if (attachment.workOrder.customerId !== isUser.customer?.id) {
			throw new AppError(httpStatus.UNAUTHORIZED, "you can not attach files");
		}
	}

	if (user.role === "MANAGER") {
		if (attachment.workOrder.managerId !== isUser.manager?.id) {
			throw new AppError(httpStatus.UNAUTHORIZED, "you can not attach files");
		}
	}

	if (user.role === "TECHNICIAN") {
		if (attachment.workOrder.technicianId !== isUser.technician?.id) {
			throw new AppError(httpStatus.UNAUTHORIZED, "you can not attach files");
		}
	}

	const deleted = await prisma.attachment.update({
		where: {
			id: attachment.id,
		},
		data: {
			isDelete: true,
			deletedAt: new Date(),
		},
	});

	return deleted;
};

export const attachmentService = {
	createAttachment,
	getMyAttach,
	getTechnicianAttach,
	getManager,
	getAllAttach,
	udpateAttach,
	deleteAttach,
};
