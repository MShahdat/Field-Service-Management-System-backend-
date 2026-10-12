import z from "zod";

export const CustomerUpdateZodSchema = z.object({
	phone: z.string().optional(),
	address: z.object({}).passthrough().optional(),
});




export const StatusUpdateZodSchema = z.object({
	status: z.enum(["ACTIVE", "BLOCKED", "DELETED"], "status must be one of ACTIVE, BLOCKED, DELETED"),
});