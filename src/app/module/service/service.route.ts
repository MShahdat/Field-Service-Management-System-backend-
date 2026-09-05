import { Router } from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../../generated/prisma/enums";
import { serviceController } from "./service.controller";
import { zodValidation } from "../../middleware/zodValidation";
import { serviceZodSchema } from "./service.validation";

const route = Router();

route.post(
	"/",
	zodValidation(serviceZodSchema),
	auth(UserRole.CUSTOMER),
	serviceController.createService,
);

route.get(
	"/my-services",
	auth(UserRole.CUSTOMER),
	serviceController.getMyServices,
);

route.get(
	"/all-services",
	auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
	serviceController.getAllServices,
);

route.get(
	"/:serviceId",
	auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.CUSTOMER),
	serviceController.getSingleService,
);

route.post("/review", auth(UserRole.MANAGER), serviceController.reviewService);

route.post(
	"/assign-technician",
	auth(UserRole.MANAGER),
	serviceController.assignTechnician,
);

route.get(
	"/workOrder/:workOrderId",
	// auth(UserRole.MANAGER),
	serviceController.getEligibleTechnician,
);

export const serviceRouter = route;
