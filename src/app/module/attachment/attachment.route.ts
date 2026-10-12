import { Router } from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../../generated/prisma/enums";
import { attachmentController } from "./attachment.controller";
import { Cloudinary } from "../../lib/cloudinary";

const route = Router();

route.post(
	"/",
	Cloudinary.upload.fields([
		{
			name: "attachment",
			maxCount: 10,
		},
	]),
	auth(UserRole.CUSTOMER, UserRole.TECHNICIAN),
	attachmentController.createAttach,
);

route.get(
	"/",
	auth(),
	attachmentController.getAttatchments
);


route.patch(
	"/update/:attachmentId",
	auth(
		UserRole.ADMIN,
		UserRole.SUPER_ADMIN,
		UserRole.CUSTOMER,
		UserRole.MANAGER,
		UserRole.TECHNICIAN,
	),
	attachmentController.updateAttach,
);

route.delete(
	"/delete/:attachmentId",
	auth(
		UserRole.ADMIN,
		UserRole.SUPER_ADMIN,
		UserRole.CUSTOMER,
		UserRole.MANAGER,
		UserRole.TECHNICIAN,
	),
	attachmentController.deletedAttach,
);

export const attachmentRouter = route;
