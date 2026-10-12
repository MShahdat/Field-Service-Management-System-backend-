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
import { UserRole } from "../../../../generated/prisma/enums";

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
		isWrokOrder.status === "CANCELLED"
	) {
		throw new AppError(
			httpStatus.BAD_REQUEST,
			`you can not attached files from ${isWrokOrder.status} status`,
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


//& GET ATTACHMENTS (ALL ROLES)
const getAttachments = async (query: IQuery, user: IRequestUser) => {
	const sort = query.sortBy ? query.sortBy : "createdAt";
	const order = query.sortOrder ? query.sortOrder : "desc";
	const page = Number(query.page || 1);
	const limit = Number(query.limit || 20);

	const andConditions: AttachmentWhereInput[] = [];

	const PARTIES = ["customer", "manager", "technician"] as const;


	switch (user.role as UserRole) {
		case "CUSTOMER": {
			const profile = await prisma.customerProfile.findUnique({
				where: {
					userId: user.userId
				},
				select: {
					id: true
				},
			});
			if (!profile) {
				throw new AppError(httpStatus.NOT_FOUND, "customer not found");
			}
			andConditions.push({ workOrder: { customerId: profile.id } });
			break;
		}
		case "MANAGER": {
			const profile = await prisma.managerProfile.findUnique({
				where: { userId: user.userId },
				select: { id: true },
			});
			if (!profile) throw new AppError(httpStatus.NOT_FOUND, "manager not found");
			andConditions.push({ workOrder: { managerId: profile.id } });
			break;
		}
		case "TECHNICIAN": {
			const profile = await prisma.technicianProfile.findUnique({
				where: { userId: user.userId },
				select: { id: true },
			});
			if (!profile) throw new AppError(httpStatus.NOT_FOUND, "technician not found");
			andConditions.push({ workOrder: { technicianId: profile.id } });
			break;
		}
		case "ADMIN":
		case "SUPER_ADMIN":
			break;
		default:
			throw new AppError(httpStatus.FORBIDDEN, "you are not allowed to view attachments");
	}


	if (query.search) {
		const partiesToSearch = PARTIES.filter((p) => p.toUpperCase() !== user.role);

		andConditions.push({
			OR: partiesToSearch.map(
				(party) =>
					({
						workOrder: {
							[party]: {
								user: {
									name: { contains: query.search, mode: "insensitive" },
								},
							},
						},
					}) as AttachmentWhereInput,
			),
		});
	}

	//~ 3. filtering
	if (query.region) {
		const areas = (query.region as string).split(",").map((item) => item.trim());
		andConditions.push({ workOrder: { region: { area: { in: areas } } } });
	}

	if (query.isDelete !== undefined) {
		andConditions.push({ isDelete: String(query.isDelete) === "true" });
	}

	const where: AttachmentWhereInput = { AND: andConditions };

	const [attachments, total] = await Promise.all([
		prisma.attachment.findMany({
			where,
			take: limit,
			skip: (page - 1) * limit,
			orderBy: { [sort]: order },
			include: { workOrder: true },
		}),
		prisma.attachment.count({ where }),
	]);

	return {
		attachments,
		meta: {
			total,
			page,
			limit,
			totalPages: Math.ceil(total / limit),
		},
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
			throw new AppError(
				httpStatus.UNAUTHORIZED,
				"you can not attach files unauthorized",
			);
		}
	}

	if (user.role === "MANAGER") {
		if (attachment.workOrder.managerId !== isUser.manager?.id) {
			throw new AppError(
				httpStatus.UNAUTHORIZED,
				"you can not attach files unauthorized",
			);
		}
	}

	if (user.role === "TECHNICIAN") {
		if (attachment.workOrder.technicianId !== isUser.technician?.id) {
			throw new AppError(
				httpStatus.UNAUTHORIZED,
				"you can not attach files unauthorized",
			);
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


//& DELETE ATTACHMENT
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

	await prisma.attachment.delete({
		where: {
			id: attachment.id,
		}
	});
};

export const attachmentService = {
	createAttachment,
	udpateAttach,
	deleteAttach,
	getAttachments
};
