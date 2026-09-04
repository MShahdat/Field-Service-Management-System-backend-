import { z } from "zod";
export const skillZodSchema = z.object({
    name: z.string().min(1, "Name is required"),
    icon: z.string().min(1, "Icon is required"),
    description: z.string().min(1, "Description is required"),
    categoryId: z.uuid("Invalid category ID"),
});
export const updateSkillZodSchema = z.object({
    name: z.string().min(1, "Name is required").optional(),
    icon: z.string().min(1, "Icon is required").optional(),
    description: z.string().min(1, "Description is required").optional(),
    categoryId: z.uuid("Invalid category ID").optional(),
});
