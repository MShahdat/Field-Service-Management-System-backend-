import { AvailabilityType } from "../../../../generated/prisma/enums";

interface Address {
	[key: string]: string;
}

export interface IAvailabilityInput {
	type: AvailabilityType;
	dayOfWeek?: number;
	date?: string; // ISO date string, e.g. "2026-09-10"
	startTime?: string; // "09:00"
	endTime?: string; // "17:00"
}

export interface IUpdateTechnician {
	phone?: string;
	nid?: string;
	address?: Address;
	bio?: string;
	skills?: string[];
	availability?: IAvailabilityInput[];
	region?: string[];
}
