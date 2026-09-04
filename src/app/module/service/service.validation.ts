import { z } from "zod";

export const serviceZodSchema = z.object({
	description: z.string().min(5),

	requestedDate: z.coerce.date(),

	address: z.object({}).passthrough(),
	categoryId: z.uuid(),
	priority: z.string(),
});
