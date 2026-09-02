import { UserRole } from "../../../generated/prisma/enums";

export interface IRequestUser {
	name: string;
	email: string;
	role: UserRole;
	userId: string;
}
