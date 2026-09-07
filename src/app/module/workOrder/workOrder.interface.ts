import { WorkOrderStatus } from "../../../../generated/prisma/enums";

type UpdateStatus = "STARTED" | "COMPLETED";

export interface IUpdateStatusPayload {
	workOrderId: string;
	status: UpdateStatus;
}
