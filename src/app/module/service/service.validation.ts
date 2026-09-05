import { z } from "zod";
import { ServiceStatus } from "../../../../generated/prisma/enums";

const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;

export const serviceZodSchema = z.object({
	description: z.string().min(5),
	servicingDate: z.coerce.date(),
	address: z.object({}).passthrough(),
	categoryId: z.uuid(),
	priority: z.string(),
	regionId: z.uuid(),
	preferredStartTime: z
		.string()
		.regex(timeRegex, "preferredStartTime must be HH:mm format")
		.optional(),
	preferredEndTime: z
		.string()
		.regex(timeRegex, "preferredEndTime must be HH:mm format")
		.optional(),
});

export const reviewServiceZodSchema = z.object({
	status: z
		.nativeEnum(ServiceStatus)
		.refine((val) => val === "APPROVED" || val === "REJECTED", {
			message: "Status must be APPROVED or REJECTED",
		}),
	rejectionReason: z.string().optional(),
});

export const assignTechnicianZodSchema = z.object({
	workOrderId: z.uuid(),
	technicianId: z.uuid(),
});
