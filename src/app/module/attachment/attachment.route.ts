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

export const attachmentRouter = route;
