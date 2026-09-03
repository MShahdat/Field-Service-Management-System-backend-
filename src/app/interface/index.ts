import { UserRole } from "../../../generated/prisma/enums";

export interface IRequestUser {
	name: string;
	email: string;
	role: UserRole;
	userId: string;
}


export interface IQuery {
	search?: string;
	sortOrder?: string;
	sortBy?: string;
	limit?: string;
	page?: string;
	[key: string]: any;
}