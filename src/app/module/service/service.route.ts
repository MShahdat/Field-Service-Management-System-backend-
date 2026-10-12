import { Router } from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../../generated/prisma/enums";
import { serviceController } from "./service.controller";
import { zodValidation } from "../../middleware/zodValidation";
import { serviceUpdateZodSchema, serviceZodSchema } from "./service.validation";

const route = Router();

route.post(
	"/",
	zodValidation(serviceZodSchema),
	auth(UserRole.CUSTOMER),
	serviceController.createService,
);

route.put(
	"/:serviceId",
	zodValidation(serviceUpdateZodSchema),
	auth(UserRole.CUSTOMER),
	serviceController.updateService,
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
	"/my-region",
	auth(UserRole.MANAGER),
	serviceController.getMyRegionServices
);


route.get(
	"/:serviceId",
	auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.CUSTOMER, UserRole.MANAGER, UserRole.TECHNICIAN),
	serviceController.getSingleService,
);

// route.post("/review", auth(UserRole.MANAGER), serviceController.reviewService);

route.post(
	"/assign-technician",
	auth(UserRole.MANAGER),
	serviceController.assignTechnician,
);

route.get(
	"/workOrder/:workOrderId",
	auth(UserRole.MANAGER),
	serviceController.getEligibleTechnicians,
);

route.patch(
	"/workOrder/technician-assign",
	auth(UserRole.MANAGER),
	serviceController.assignTechnician,
);


route.patch(
	"/delete/:serviceId",
	auth(UserRole.CUSTOMER),
	serviceController.softDelete,
);

export const serviceRouter = route;
