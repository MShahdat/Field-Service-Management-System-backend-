import { Router } from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../../generated/prisma/enums";
import { analyticsController } from "./analytics.controller";

const router = Router();

router.get(
	"/admin",
	auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
	analyticsController.getAdminStats,
);

router.get(
	"/customer",
	auth(UserRole.CUSTOMER),
	analyticsController.getCustomerStats,
);

router.get(
	"/technician",
	auth(UserRole.TECHNICIAN),
	analyticsController.getTechnicianStats,
);

router.get(
	"/manager",
	auth(UserRole.MANAGER),
	analyticsController.getManagerStats,
);

export const analyticsRoutes = router;
