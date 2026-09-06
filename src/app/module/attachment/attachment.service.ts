import { UploadApiResponse } from "cloudinary";
import { IRequestUser } from "../../interface";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/appError";
import { IAttachmentPayload } from "./attachment.interface";
import httpStatus from "http-status";
import { Cloudinary } from "../../lib/cloudinary";

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

export const attachmentService = {
	createAttachment,
};
