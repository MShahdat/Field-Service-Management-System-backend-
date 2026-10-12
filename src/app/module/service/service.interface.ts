import { AvailabilityType, Priority } from "../../../../generated/prisma/enums";

interface Address {
	[key: string]: string;
}

export interface IServicePayload {
	title: string;
	description: string;
	servicingDate: string;
	priority: Priority;
	address: Address;
	categoryId: string;
	regionId: string;
	preferredStartTime?: string;
}


export interface IUpdateServicePayload {
	title: string;
	description?: string;
	servicingDate?: string;
	priority?: Priority;
	address?: Address;
	categoryId?: string;
	regionId?: string;
	preferredStartTime?: string;
}


type Status = "REJECTED" | "ASSIGNED";

export interface IReviewPayload {
	serviceId: string;

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
	status: Status;
	rejectionReason?: string;
}
