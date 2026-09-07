import { Router } from "express";
import { UserRole } from "../../../../generated/prisma/enums";
import { auth } from "../../middleware/auth";
import { Cloudinary } from "../../lib/cloudinary";
import { userController } from "./user.controller";
import { zodValidation } from "../../middleware/zodValidation";
import { CustomerUpdateZodSchema } from "./user.validation";

const route = Router();

route.patch(
	"/profile-image",
	auth(
		UserRole.ADMIN,
		UserRole.CUSTOMER,
		UserRole.MANAGER,
		UserRole.SUPER_ADMIN,
		UserRole.TECHNICIAN,
	),
	Cloudinary.upload.single("profile"),
	userController.profileImageUpload,
);

route.patch(
	"/customer/update-profile",
	zodValidation(CustomerUpdateZodSchema),
	auth(UserRole.CUSTOMER),
	userController.udpateCustomer,
);

export const userRouter = route;
