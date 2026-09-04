import { Priority } from "../../../../generated/prisma/enums";

interface Address {
	[key: string]: string;
}

export interface IServicePayload {
	description: string;
	requestedDate: string;
	priority: Priority;
	address: Address;
	categoryId: string;
}

type Status = "REJECTED" | "APPROVED";

export interface IReviewPayload {
	serviceId: string;
	status: Status;
	rejectionReason?: string;
}
