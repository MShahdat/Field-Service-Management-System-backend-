import { Router } from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../../generated/prisma/enums";
import { scheduleController } from "./schedule.controller";

const route = Router();

route.get(
	"/all-schedule",
	auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
	scheduleController.getAllSchedule,
);

route.get(
	"/my-schedule",
	auth(UserRole.TECHNICIAN),
	scheduleController.getSchedulesTech,
);

route.get(
	"/:scheduleId",
	auth(
		UserRole.ADMIN,
		UserRole.SUPER_ADMIN,
		UserRole.CUSTOMER,
		UserRole.MANAGER,
		UserRole.TECHNICIAN,
	),
	scheduleController.singleSchedule,
);

export const scheduleRouter = route;
