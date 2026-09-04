import { Router } from "express";
import { categoryController } from "./category.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../../generated/prisma/enums";

const route = Router();
route.post(
	"/",
	auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
	categoryController.createCategory,
);

route.get("/all", categoryController.getCategories);

route.get(
	"/all-category",
	auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
	categoryController.getAllCategory,
);

route.put(
	"/:categoryId",
	auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
	categoryController.udpateCategory,
);

export const categoryRotuer = route;
