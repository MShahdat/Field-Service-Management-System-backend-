import { AvailabilityType, Priority } from "../../../../generated/prisma/enums";

interface Address {
	[key: string]: string;
}

export interface IServicePayload {
	description: string;
	servicingDate: string;
	priority: Priority;
	address: Address;
	categoryId: string;
	regionId: string;
	preferredStartTime?: string;
	preferredEndTime?: string;
}

type Status = "REJECTED" | "APPROVED";

export interface IReviewPayload {
	serviceId: string;
	status: Status;
	rejectionReason?: string;
}

export interface IEligibleTechnician {
	id: string;
	name: string;
	phone: string;
	rating: number;
	jobsCompleted: number;
	skills: { id: string; name: string }[];
	regions: { id: string; name: string }[];

	availability: {
		type: AvailabilityType;
		dayOfWeek?: number;
		date?: Date;
		startTime?: string;
		endTime?: string;
	}[];
}

export interface IAssignTechnician {
	workOrderId: string;
	technicianId: string;
	amount: number;
}
