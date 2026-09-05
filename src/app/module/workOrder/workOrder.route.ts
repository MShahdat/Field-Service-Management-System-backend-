import { Router } from "express";
import { UserRole } from "../../../../generated/prisma/enums";
import { auth } from "../../middleware/auth";
import { workOrderController } from "./workOrder.controller";

const route = Router();

route.get(
	"/my-workorder",
	auth(UserRole.TECHNICIAN, UserRole.CUSTOMER, UserRole.MANAGER),
	workOrderController.getMyWorkOrders,
);

route.get(
	"/new-workorder",
	auth(UserRole.TECHNICIAN),
	workOrderController.getNewWorkOrders,
);

route.patch(
	"/update",
	auth(UserRole.TECHNICIAN),
	workOrderController.updateStatus,
);

export const workOrderRouter = route;
