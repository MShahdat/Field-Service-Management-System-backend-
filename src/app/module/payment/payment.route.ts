import { Router } from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../../generated/prisma/enums";
import { paymentController } from "./payment.controller";

const route = Router();

route.post("/create", auth(UserRole.CUSTOMER), paymentController.createpayment);

route.get("/service/callback", paymentController.bkashCallback);

export const paymentRouter = route;
