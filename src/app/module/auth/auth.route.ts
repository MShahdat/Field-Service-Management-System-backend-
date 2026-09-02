import { Router } from "express";
import { authController } from "./auth.controller";
import { zodValidation } from "../../middleware/zodValidation";
import {
	CustomerRegisterZodSchema,
	forgotPasswordZodSchema,
	loginZodSchema,
	resetPasswordZodSchema,
} from "./auth.validation";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../../generated/prisma/enums";

const route = Router();

route.post(
	"/register",
	zodValidation(CustomerRegisterZodSchema),
	authController.registerOTP,
);

route.post("/email-verify", authController.verifyEmail);

route.post("/login", zodValidation(loginZodSchema), authController.loginUser);

route.get(
	"/me",
	auth(
		UserRole.ADMIN,
		UserRole.CUSTOMER,
		UserRole.MANAGER,
		UserRole.SUPER_ADMIN,
		UserRole.TECHNICIAN,
	),
	authController.getMe,
);

route.post("/refresh-token", authController.refreshToken);

route.post(
	"/forgot-password",
	zodValidation(forgotPasswordZodSchema),
	authController.forgotPassword,
);

route.post(
	"/reset-password",
	zodValidation(resetPasswordZodSchema),
	authController.resetPassword,
);

export const authRouter = route;
