import config from "../config/env";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import { AppError } from "./appError";
import httpStatus from "http-status";
import { UserRole } from "../../../generated/prisma/enums";
export const seedSuperAdmin = async () => {
    try {
        const existSuperAdmin = await prisma.user.findFirst({
            where: { role: "SUPER_ADMIN" },
        });
        if (existSuperAdmin) {
            console.log("super admin already exists");
            return;
        }
        const name = config.super_admin_name;
        const email = config.super_admin_email;
        const password = config.super_admin_password;
        if (!name || !email || !password) {
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "no super admin name, email, password");
        }
        const hasPass = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
        const superAdmi = await prisma.user.create({
            data: {
                name,
                email,
                password: hasPass,
                emailVerified: true,
                needPasswordChange: false,
                role: UserRole.SUPER_ADMIN,
            },
        });
        console.log("super admin created", superAdmi);
    }
    catch (error) {
        console.log("error", error);
        await prisma.user.delete({
            where: { email: config.super_admin_email },
        });
    }
};
export const seedTesterAdmin = async () => {
    try {
        const name = config.tester_admin_name;
        const email = config.tester_admin_email;
        const password = config.tester_admin_password;
        if (!name || !email || !password) {
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "no tester admin name, email, password");
        }
        const existTesterAdmin = await prisma.user.findUnique({
            where: { email },
        });
        if (existTesterAdmin) {
            console.log("tester admin already exists");
            return;
        }
        const hasPass = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
        const testerAdmin = await prisma.user.create({
            data: {
                name,
                email,
                password: hasPass,
                emailVerified: true,
                needPasswordChange: false,
                role: UserRole.ADMIN,
            },
        });
        console.log("tester admin created", testerAdmin);
    }
    catch (error) {
        console.log("error", error);
        await prisma.user.delete({
            where: { email: config.tester_admin_email },
        });
    }
};
export const seedTesterManager = async () => {
    try {
        const name = config.tester_manager_name;
        const email = config.tester_manager_email;
        const password = config.tester_manager_password;
        if (!name || !email || !password) {
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "no tester manager name, email, password");
        }
        const existTesterManager = await prisma.user.findUnique({
            where: { email },
        });
        if (existTesterManager) {
            console.log("tester manager already exists");
            return;
        }
        const hasPass = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
        const testerManager = await prisma.user.create({
            data: {
                name,
                email,
                password: hasPass,
                emailVerified: true,
                needPasswordChange: false,
                role: UserRole.MANAGER,
                manager: {
                    create: {
                        phone: "01885374041",
                        nid: "nid-123456",
                        address: {
                            village: "Tapadar Para",
                            PO: "Farazikandi",
                        },
                    },
                },
            },
        });
        console.log("tester manager created", testerManager);
    }
    catch (error) {
        console.log("error", error);
        await prisma.user.delete({
            where: { email: config.tester_manager_email },
        });
    }
};
