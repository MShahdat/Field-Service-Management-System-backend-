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
	"/today",
	auth(
		UserRole.ADMIN,
		UserRole.SUPER_ADMIN,
		UserRole.CUSTOMER,
		UserRole.MANAGER,
		UserRole.TECHNICIAN,
	),
	workOrderController.getTodaysWorkOrders,
);

route.get(
	"/new-workorder",
	auth(UserRole.TECHNICIAN),
	workOrderController.getNewWorkOrders,
);

route.get(
	"/:workOrderId",
	auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.MANAGER, UserRole.SUPER_ADMIN, UserRole.TECHNICIAN),
	workOrderController.getWorkOrder
)


route.patch(
	"/update",
	auth(UserRole.TECHNICIAN),
	workOrderController.updateStatus,
);

export const workOrderRouter = route;
