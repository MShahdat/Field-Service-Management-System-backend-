import { UploadApiResponse } from "cloudinary";
import { Cloudinary } from "../../lib/cloudinary";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/appError";
import httpStatus from "http-status";
import { IRequestUser } from "../../interface";

//& PROFILE IMAGE UPLOAD
const profileImageUpload = async (
	image: Express.Multer.File,
	user: IRequestUser,
) => {
	const isUser = await prisma.user.findUnique({
		where: {
			id: user.userId,
		},
	});

	if (!isUser) {
		throw new AppError(httpStatus.NOT_FOUND, "user not found");
	}

	const cloudinaryRes = await new Promise<UploadApiResponse>(
		(resolve, reject) => {
			Cloudinary.cloudinary.uploader
				.upload_stream(
					{
						folder: "Field-Service-Management/Profile",
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
				.end(image.buffer);
		},
	);

	const updateImage = await prisma.user.update({
		where: {
			id: user.userId,
		},
		data: {
			profileImg: cloudinaryRes.secure_url,
			profileImgPublicId: cloudinaryRes.public_id,
		},
		omit: {
			password: true,
		},
	});

	if (isUser.profileImgPublicId) {
		Cloudinary.cloudinary.uploader
			.destroy(isUser.profileImgPublicId, {
				invalidate: true,
			})
			.catch((error) => console.log(error));
	}
	return updateImage;
};

export const userService = {
	profileImageUpload,
};
