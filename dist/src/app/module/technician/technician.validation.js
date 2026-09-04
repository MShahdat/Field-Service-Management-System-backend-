import { z } from "zod";
import { isBefore, parse } from "date-fns";
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
const availabilitySchema = z
    .object({
    type: z.enum(["RECURRING", "ONE_OFF", "BLOCKED"]),
    dayOfWeek: z.number().int().min(0).max(6).optional(),
    date: z.string().datetime({ offset: true }).or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).optional(),
    startTime: z.string().regex(timeRegex, "startTime must be HH:mm format").optional(),
    endTime: z.string().regex(timeRegex, "endTime must be HH:mm format").optional(),
})
    .refine((data) => {
    if (data.type === "RECURRING")
        return data.dayOfWeek !== undefined;
    return true;
}, { message: "dayOfWeek is required when type is RECURRING" })
    .refine((data) => {
    if (data.type === "ONE_OFF" || data.type === "BLOCKED")
        return !!data.date;
    return true;
}, { message: "date is required when type is ONE_OFF or BLOCKED" })
    .refine((data) => {
    if (data.type !== "BLOCKED")
        return !!data.startTime && !!data.endTime;
    return true;
}, { message: "startTime and endTime are required unless type is BLOCKED" })
    .refine((data) => {
    if (data.type !== "BLOCKED" && data.startTime && data.endTime) {
        const start = parse(data.startTime, "HH:mm", new Date());
        const end = parse(data.endTime, "HH:mm", new Date());
        return isBefore(start, end);
    }
    return true;
}, { message: "startTime must be before endTime" });
export const completeProfileZodSchema = z.object({
    phone: z.string().min(6).optional(),
    address: z.object({}).passthrough().optional(),
    bio: z.string().optional(),
    nid: z.string().optional(),
    skills: z.array(z.string().uuid()).optional(),
    regionIds: z.array(z.string().uuid()).optional(),
    availability: z.array(availabilitySchema).optional(),
});
