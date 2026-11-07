import { UploadApiResponse } from "cloudinary";
import { Cloudinary } from "../../lib/cloudinary";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/appError";
import httpStatus from "http-status";
import { IQuery, IRequestUser } from "../../interface";
import { IStatusUpdate, IUpdateCustomer } from "./user.interface";
import { UserWhereInput } from "../../../../generated/prisma/models";
import { parseCsv, parseEnumList } from "../../utils/utility";
import { AuthProvider, UserRole, UserStatus } from "../../../../generated/prisma/enums";

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

//& PROFILE UPDATE
const updateCustomer = async (payload: IUpdateCustomer, user: IRequestUser) => {
	const res = await prisma.customerProfile.update({
		where: {
			userId: user.userId,
		},
		data: {
			...payload,
		},
		include: {
			user: true,
		},
	});

	return res;
};



//& GET ALL USERS (ADMIN)
const getAllUsers = async (query: IQuery) => {
	const sort = query.sortBy ? query.sortBy : "createdAt";
	const order = query.sortOrder ? query.sortOrder : "desc";
	const page = Number(query.page || 1);
	const limit = Number(query.limit || 20);

	const andConditions: UserWhereInput[] = [
		{
			role: {
				in: ["CUSTOMER", "TECHNICIAN", "MANAGER"],
			}
		}
	];

	if (query.search) {
		andConditions.push({
			OR: [
				{
					name: {
						contains: query.search,
						mode: "insensitive",
					},
				},
				{
					email: {
						contains: query.search,
						mode: 'insensitive'
					}
				},
			],
		});
	}

	if (query.name) {
		andConditions.push({
			name: query.name
		})
	}

	const statusList = parseEnumList(query.status, UserStatus, "status");
	if (statusList.length > 0) {
		andConditions.push({
			status: {
				in: statusList
			}
		});
	}

	const roleList = parseEnumList(query.role, UserRole, "role");
	if (roleList.length > 0) {
		andConditions.push({
			role: {
				in: roleList
			}
		});
	}

	const authProviderList = parseEnumList(query.authProvider, AuthProvider, "authProvider");
	if (authProviderList.length > 0) {
		andConditions.push({
			authProvider: {
				in: authProviderList
			}
		});
	}

	const users = await prisma.user.findMany({
		where: {
			AND: andConditions,
		},
		omit: {
			password: true
		},
		take: limit,
		skip: (page - 1) * limit,
		orderBy: {
			[sort]: order,
		},

	});

	const total = await prisma.user.count({
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
		users,
		meta,
	};
};


//& UPDATE STATUS (ADMIN)
const statusUpdate = async (payload: IStatusUpdate, userId: string) => {
	const isUser = await prisma.user.findUnique({
		where: { id: userId },
	});

	if (!isUser) {
		throw new AppError(httpStatus.NOT_FOUND, "user not found");
	}

	await prisma.user.update({
		where: {
			id: userId
		},
		data: {
			status: payload.status,
			isDeleted: true,
			deletedAt: new Date()
		}
	})
};


export const userService = {
	profileImageUpload,
	updateCustomer,
	getAllUsers,
	statusUpdate,

};




