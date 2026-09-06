import { Router } from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../../generated/prisma/enums";
import { reportController } from "./report.controller";
import { Cloudinary } from "../../lib/cloudinary";

const route = Router();

route.post(
	"/",
	Cloudinary.upload.single("report"),
	auth(UserRole.TECHNICIAN),
	reportController.attachReport,
);

route.get(
	"/my-reports",
	auth(UserRole.TECHNICIAN),
	reportController.getMyReport,
);

route.get(
	"/all-reports",
	auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
	reportController.getAllReport,
);

route.patch(
	"/update/:reportId",
	Cloudinary.upload.single("report"),
	auth(UserRole.TECHNICIAN),
	reportController.updateReport,
);

route.patch(
	"/delete/:reportId",
	auth(UserRole.TECHNICIAN, UserRole.SUPER_ADMIN, UserRole.ADMIN),
	reportController.deleteReport,
);

export const reportRouter = route;
