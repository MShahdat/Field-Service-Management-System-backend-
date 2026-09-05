import { WorkOrderWhereInput } from "../../../../generated/prisma/models";
import { IQuery, IRequestUser } from "../../interface";
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

	// Validate skills
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
			// --- SKILLS: Merge with existing (Option B: merge) ---
			let mergedSkills: string[] | undefined;
			if (skills !== undefined) {
				const existing = await tx.technicianProfile.findUnique({
					where: { id: isTechnician.id },
					select: { skills: { select: { id: true } } },
				});
				const existingIds = existing?.skills.map((s) => s.id) || [];
				mergedSkills = [...new Set([...existingIds, ...skills])];
			}

			const update = await tx.technicianProfile.update({
				where: { id: isTechnician.id },
				data: {
					...(phone !== undefined && { phone }),
					...(address !== undefined && { address }),
					...(bio !== undefined && { bio }),
					...(nid !== undefined && { nid }),
					...(mergedSkills !== undefined && {
						skills: { set: mergedSkills.map((id) => ({ id })) },
					}),
					...(region !== undefined && {
						regions: { set: region.map((id) => ({ id })) },
					}),
				},
			});

			// --- AVAILABILITY: Upsert by unique keys ---
			if (availability !== undefined && availability.length > 0) {
				const recurring = availability.filter((s) => s.type === "RECURRING");
				const oneOffOrBlocked = availability.filter(
					(s) => s.type !== "RECURRING",
				);

				// RECURRING: upsert by dayOfWeek
				for (const slot of recurring) {
					await tx.availability.upsert({
						where: {
							technicianId_type_dayOfWeek: {
								technicianId: isTechnician.id,
								type: "RECURRING",
								dayOfWeek: slot.dayOfWeek!,
							},
						},
						update: {
							startTime: slot.startTime
								? new Date(`1970-01-01T${slot.startTime}:00Z`)
								: null,
							endTime: slot.endTime
								? new Date(`1970-01-01T${slot.endTime}:00Z`)
								: null,
							isActive: true,
						},
						create: {
							technicianId: isTechnician.id,
							type: "RECURRING",
							dayOfWeek: slot.dayOfWeek!,
							startTime: slot.startTime
								? new Date(`1970-01-01T${slot.startTime}:00`)
								: null,
							endTime: slot.endTime
								? new Date(`1970-01-01T${slot.endTime}:00`)
								: null,
						},
					});
				}

				// ONE_OFF/BLOCKED: upsert by date
				for (const slot of oneOffOrBlocked) {
					await tx.availability.upsert({
						where: {
							technicianId_type_date: {
								technicianId: isTechnician.id,
								type: slot.type,
								date: new Date(slot.date!),
							},
						},
						update: {
							startTime: slot.startTime
								? new Date(`1970-01-01T${slot.startTime}:00Z`)
								: null,
							endTime: slot.endTime
								? new Date(`1970-01-01T${slot.endTime}:00Z`)
								: null,
							isActive: true,
						},
						create: {
							technicianId: isTechnician.id,
							type: slot.type,
							date: new Date(slot.date!),
							startTime: slot.startTime
								? new Date(`1970-01-01T${slot.startTime}:00Z`)
								: null,
							endTime: slot.endTime
								? new Date(`1970-01-01T${slot.endTime}:00Z`)
								: null,
						},
					});
				}
			}

			const tech = await tx.technicianProfile.findUnique({
				where: {
					id: isTechnician.id,
				},
			});

			return tech;
		},
		{ maxWait: 10000, timeout: 15000 },
	);

	const fullProfile = await prisma.technicianProfile.findUnique({
		where: { id: transactionResult?.id },
		include: { skills: true, regions: true, availability: true },
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
	// Before returning fullProfile to the client:
	// const formattedAvailability = fullProfile?.availability.map((slot) => ({
	// 	...slot,
	// 	startTime: slot.startTime
	// 		? new Date(slot.startTime).toISOString().substring(11, 16)
	// 		: null,
	// 	endTime: slot.endTime
	// 		? new Date(slot.endTime).toISOString().substring(11, 16)
	// 		: null,
	// }));

	// return { ...fullProfile, availability: formattedAvailability };
};

export const technicianService = {
	completeProfile,
};
