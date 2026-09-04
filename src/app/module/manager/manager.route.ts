import { Router } from "express";
import { managerController } from "./manager.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../../generated/prisma/enums";
import { zodValidation } from "../../middleware/zodValidation";
import {
	managerApplyValidation,
	emailVerifyValidation,
	approveManagerValidation,
} from "./manager.validation";

const route = Router();

route.post(
	"/manager-apply",
	zodValidation(managerApplyValidation),
	managerController.applyManger,
);

route.post(
	"/email-verify",
	zodValidation(emailVerifyValidation),
	managerController.emailVerify,
);

route.post(
	"/manager-approved",
	auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
	zodValidation(approveManagerValidation),
	managerController.approveManger,
);

route.get(
	"/all-managers",
	auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
	managerController.getAllMangers,
);

export const managerRouter = route;
