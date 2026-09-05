import { WorkOrderStatus } from "../../../../generated/prisma/enums";

export interface IUpdateStatusPayload {
	workOrderId: string;
	status: WorkOrderStatus;
}
