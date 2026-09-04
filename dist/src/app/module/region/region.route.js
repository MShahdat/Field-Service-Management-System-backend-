import { Router } from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../../generated/prisma/enums";
import { regionController } from "./region.controller";
const route = Router();
route.post("/", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), regionController.createRegion);
route.get("/all-region", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), regionController.getAllRegion);
route.put("/:regionId", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), regionController.updateRegion);
export const regionRouter = route;
