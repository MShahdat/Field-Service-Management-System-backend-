export interface ICategoryPayload {
	name: string;
	icon?: string;
	description?: string;
	duration: number;
}

export interface IUpdateCategoryPayload {
	name?: string;
	icon?: string;
	description?: string;
	duration?: number;
}
