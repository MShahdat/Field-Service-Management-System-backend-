import { Router } from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../../generated/prisma/enums";
import { regionController } from "./region.controller";

const route = Router();

route.post(
	"/",
	auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
	regionController.createRegion,
);

route.get(
	"/all-region",
	auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
	regionController.getAllRegion,
);

route.get(
	"/:regionId",
	regionController.getSingleRegion
)

route.get("/", regionController.getRegions);

route.put(
	"/:regionId",
	auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
	regionController.updateRegion,
);

route.patch(
	"/:regionId",
	auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
	regionController.statusUpdate,
);


export const regionRouter = route;
