import z from "zod";

export const CustomerUpdateZodSchema = z.object({
	phone: z.string().optional(),
	address: z.object({}).passthrough().optional(),
});
