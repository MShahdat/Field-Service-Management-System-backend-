import { Router } from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../../generated/prisma/enums";
import { attachmentController } from "./attachment.controller";
import { Cloudinary } from "../../lib/cloudinary";

const route = Router();

route.post(
	"/create",
	Cloudinary.upload.fields([
		{
			name: "attachment",
			maxCount: 10,
		},
	]),
	auth(UserRole.CUSTOMER, UserRole.MANAGER, UserRole.TECHNICIAN),
	attachmentController.createAttach,
);

route.get(
	"/my-attachments",
	auth(UserRole.CUSTOMER),
	attachmentController.getMyAttach,
);

route.get(
	"/technician-attachments",
	auth(UserRole.TECHNICIAN),
	attachmentController.getAttachTech,
);

route.get(
	"/manager-attachments",
	auth(UserRole.MANAGER),
	attachmentController.getAttachManager,
);

route.get(
	"/all-attachments",
	auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
	attachmentController.getAllTech,
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

route.patch(
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
