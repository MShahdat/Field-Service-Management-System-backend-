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
import passport from "passport";

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

route.get(
	"/google",
	passport.authenticate("google", {
		session: false,
		scope: ["profile", "email"],
	}),
);

route.get(
	"/google/callback",
	passport.authenticate("google", { session: false }),
	authController.googleLogin,
);

route.get(
	"/facebook",
	passport.authenticate("facebook", {
		session: false,
		scope: ["email"],
	}),
);

route.get(
	"/facebook/callback",
	passport.authenticate("facebook", { session: false }),
	authController.facebookLogin,
);

export const authRouter = route;
