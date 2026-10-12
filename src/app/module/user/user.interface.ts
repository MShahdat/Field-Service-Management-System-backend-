import { UserStatus } from "../../../../generated/prisma/enums";

interface Address {
	[key: string]: string;
}

export interface IUpdateCustomer {
	name?: string
	phone?: string;
	address?: Address;
}



export interface IStatusUpdate {
	status: UserStatus
}