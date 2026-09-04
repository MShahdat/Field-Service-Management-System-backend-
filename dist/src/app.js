import express from "express";
import config from "./app/config/env";
import cors from "cors";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";
import { authRouter } from "./app/module/auth/auth.route";
import "./app/lib/passport";
import passport from "passport";
import { regionRouter } from "./app/module/region/region.route";
import { managerRouter } from "./app/module/manager/manager.route";
import { categoryRotuer } from "./app/module/category/category.route";
import { serviceRouter } from "./app/module/service/service.route";
import { skillRoute } from "./app/module/skill/skill.route";
import { technicianRoutes } from "./app/module/technician/technician.route";
const app = express();
app.use(cors({
    origin: config.frontend_url,
    credentials: true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.get("/", async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Field Service Management System",
        author: "Md. Shahdat Hossain",
    });
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/region", regionRouter);
app.use("/api/v1/manager", managerRouter);
app.use("/api/v1/category", categoryRotuer);
app.use("/api/v1/service", serviceRouter);
app.use("/api/v1/skill", skillRoute);
app.use('/api/v1/technician', technicianRoutes);
app.use(globalErrorHandler);
app.use(notFound);
export default app;
