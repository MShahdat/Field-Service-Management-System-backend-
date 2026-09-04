import { z } from "zod";
import { ServiceStatus } from "../../../../generated/prisma/enums";
export const serviceZodSchema = z.object({
    description: z.string().min(5),
    requestedDate: z.coerce.date(),
    address: z.object({}).passthrough(),
    categoryId: z.uuid(),
    priority: z.string(),
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
    technicianId: z.uuid(),
    scheduledStart: z.coerce.date(),
    scheduledEnd: z.coerce.date(),
});
