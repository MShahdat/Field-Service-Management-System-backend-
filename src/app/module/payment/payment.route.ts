import { Router } from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../../generated/prisma/enums";
import { paymentController } from "./payment.controller";

const route = Router();

route.post("/create", auth(UserRole.CUSTOMER), paymentController.createpayment);

route.get("/service/callback", paymentController.bkashCallback);

route.get(
	"my-payments",
	auth(UserRole.CUSTOMER),
	paymentController.getMyPayment,
);

route.get(
	"technician-payments",
	auth(UserRole.TECHNICIAN),
	paymentController.getTechPayment,
);

route.get(
	"manager-payments",
	auth(UserRole.MANAGER),
	paymentController.getManagerPayment,
);

route.get(
	"all-payments",
	auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
	paymentController.getAllPayments,
);

export const paymentRouter = route;
