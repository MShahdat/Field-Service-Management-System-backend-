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

export const serviceRouter = route;
