import { z } from "zod";
import { AvailabilityType, TechStatus } from "../../../../generated/prisma/enums";
export const technicianProfileZodSchema = z.object({
    phone: z.string().optional(),
    address: z.object({}).passthrough().optional(),
    bio: z.string().optional(),
    skills: z.array(z.uuid()).min(1, "At least one skill is required"),
    availability: z.array(z.object({
        type: z.nativeEnum(AvailabilityType),
        dayOfWeek: z.number().min(0).max(6).optional(),
        date: z.coerce.date().optional(),
        startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)"),
        endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)"),
        isActive: z.boolean().optional(),
    })).min(1, "At least one availability slot is required"),
});
export const updateTechnicianProfileZodSchema = z.object({
    phone: z.string().optional(),
    address: z.object({}).passthrough().optional(),
    bio: z.string().optional(),
    status: z.nativeEnum(TechStatus).optional(),
    skills: z.array(z.uuid()).optional(),
});
export const availabilityZodSchema = z.object({
    type: z.nativeEnum(AvailabilityType),
    dayOfWeek: z.number().min(0).max(6).optional(),
    date: z.coerce.date().optional(),
    startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)"),
    endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)"),
    isActive: z.boolean().optional(),
}).refine((data) => {
    if (data.type === "RECURRING" && data.dayOfWeek === undefined) {
        return false;
    }
    if (data.type === "ONE_OFF" && !data.date) {
        return false;
    }
    return true;
}, {
    message: "dayOfWeek is required for RECURRING, date is required for ONE_OFF",
    path: ["type"],
});
export const updateAvailabilityZodSchema = z.object({
    type: z.nativeEnum(AvailabilityType).optional(),
    dayOfWeek: z.number().min(0).max(6).optional(),
    date: z.coerce.date().optional(),
    startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)").optional(),
    endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)").optional(),
    isActive: z.boolean().optional(),
});
export const availableTechniciansQueryZodSchema = z.object({
    categoryId: z.uuid(),
    requestedDate: z.coerce.date(),
    regionId: z.uuid().optional(),
    scheduledStart: z.coerce.date(),
    scheduledEnd: z.coerce.date(),
});
