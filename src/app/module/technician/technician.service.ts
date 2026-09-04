import { IRequestUser } from "../../interface";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/appError";
import { IUpdateTechnician } from "./technician.interface";
import httpStatus from "http-status";

//& COMPLETE PROFILE
const completeProfile = async (
	payload: IUpdateTechnician,
	user: IRequestUser,
) => {
	const { phone, address, bio, nid, skills, region, availability } = payload;

	const isTechnician = await prisma.technicianProfile.findUnique({
		where: { userId: user.userId },
	});

	if (!isTechnician) {
		throw new AppError(httpStatus.NOT_FOUND, "technician not found");
	}

	if (isTechnician.isDeleted) {
		throw new AppError(httpStatus.FORBIDDEN, "This profile has been deleted");
	}

	// Only validate skills if they were actually submitted this call
	if (skills !== undefined) {
		const existingSkills = await prisma.skill.findMany({
			where: { id: { in: skills } },
			select: { id: true },
		});

		if (existingSkills.length !== skills.length) {
			const existingIds = existingSkills.map((s) => s.id);
			const missingIds = skills.filter((id) => !existingIds.includes(id));
			throw new AppError(
				httpStatus.NOT_FOUND,
				`Skill not found: ${missingIds.join(", ")}`,
			);
		}
	}

	// Only validate regions if they were actually submitted this call
	if (region !== undefined) {
		const existingRegions = await prisma.region.findMany({
			where: { id: { in: region }, isActive: true },
			select: { id: true },
		});

		if (existingRegions.length !== region.length) {
			const existingIds = existingRegions.map((r) => r.id);
			const missingIds = region.filter((id) => !existingIds.includes(id));
			throw new AppError(
				httpStatus.NOT_FOUND,
				`Region not found or inactive: ${missingIds.join(", ")}`,
			);
		}
	}

	const transactionResult = await prisma.$transaction(
		async (tx) => {
			const update = await tx.technicianProfile.update({
				where: { id: isTechnician.id },
				data: {
					...(phone !== undefined && { phone }),
					...(address !== undefined && { address }),
					...(bio !== undefined && { bio }),
					...(nid !== undefined && { nid }),
					...(skills !== undefined && {
						skills: { set: skills.map((id) => ({ id })) },
					}),
					...(region !== undefined && {
						regions: { set: region.map((id) => ({ id })) },
					}),
				},
			});

			if (availability !== undefined) {
				await tx.availability.deleteMany({
					where: { technicianId: isTechnician.id },
				});

				await tx.availability.createMany({
					data: availability.map((slot) => ({
						technicianId: isTechnician.id,
						type: slot.type,
						dayOfWeek: slot.dayOfWeek,
						date: slot.date ? new Date(slot.date) : null,
						startTime: slot.startTime
							? new Date(`1970-01-01T${slot.startTime}:00`)
							: null,
						endTime: slot.endTime
							? new Date(`1970-01-01T${slot.endTime}:00`)
							: null,
					})),
				});
			}

			return update;
		},
		{
			maxWait: 10000,
			timeout: 15000,
		},
	);

	const fullProfile = await prisma.technicianProfile.findUnique({
		where: { id: transactionResult.id },
		include: {
			skills: true,
			regions: true,
			availability: true,
		},
	});

	const isNowComplete =
		!!fullProfile!.phone &&
		fullProfile!.skills.length > 0 &&
		fullProfile!.regions.length > 0 &&
		fullProfile!.availability.length > 0;

	if (isNowComplete !== fullProfile!.isProfileCompleted) {
		await prisma.technicianProfile.update({
			where: { id: fullProfile!.id },
			data: { isProfileCompleted: isNowComplete },
		});
	}

	return fullProfile;
};

export const technicianService = {
	completeProfile,
};
