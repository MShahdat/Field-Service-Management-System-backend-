import { Router } from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../../generated/prisma/enums";
import { feedbackController } from "./feedbck.controller";

const route = Router();

route.post("/", auth(UserRole.CUSTOMER), feedbackController.createFeedback);

route.get(
	"/:feedbackId",
	auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
	feedbackController.getById,
);

route.get("/", feedbackController.getAllFeedbacks);

route.put(
	"/update/:feedbackId",
	auth(UserRole.CUSTOMER),
	feedbackController.updateFeedback,
);

route.delete(
	"/delete/:feedbackId",
	auth(UserRole.CUSTOMER),
	feedbackController.deleteFeedback,
);

export const feedbackRouter = route;
