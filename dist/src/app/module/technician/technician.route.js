import { Router } from "express";
import { zodValidation } from "../../middleware/zodValidation";
import { completeProfileZodSchema } from "./technician.validation";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../../generated/prisma/enums";
import { technicianController } from "./technician.controller";
const route = Router();
route.patch("/me/profile", zodValidation(completeProfileZodSchema), auth(UserRole.TECHNICIAN), technicianController.completeProfile);
export const technicianRoutes = route;
