export interface ISkillPayload {
	name: string;
	icon?: string;
	description?: string;
	categoryId: string;
}

export interface IUpdateSkillPayload {
	name?: string;
	icon?: string;
	description?: string;
	categoryId?: string;
}
