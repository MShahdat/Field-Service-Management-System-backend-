import { z } from "zod";

export const skillZodSchema = z.object({
	name: z.string().min(1, "Name is required"),
	icon: z.string().optional(),
	description: z.string().optional(),
	categoryId: z.uuid("Invalid category ID"),
});

export const updateSkillZodSchema = z.object({
	name: z.string().optional(),
	icon: z.string().optional(),
	description: z.string().optional(),
	categoryId: z.uuid().optional(),
});
