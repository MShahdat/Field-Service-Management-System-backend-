import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/appError";
import httpStatus from 'http-status';
//& UPDATE PROFILE
const udpateProfile = async (payload, user) => {
    const isTechnician = await prisma.technicianProfile.findUnique({
        where: {
            userId: user.userId
        }
    });
    if (!isTechnician) {
        throw new AppError(httpStatus.NOT_FOUND, 'technician not found');
    }
};
export const technicianService = {
    udpateProfile,
};
