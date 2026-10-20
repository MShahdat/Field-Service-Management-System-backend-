import { IQuery, IRequestUser } from "../../interface";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/appError";
import { IUpdateTechnician } from "./technician.interface";
import httpStatus from "http-status";
import { formatTimeToHHmm } from "../../utils/utility";
import { TechnicianProfileWhereInput, UserWhereInput } from "../../../../generated/prisma/models";
import { UserRole, UserStatus } from "../../../../generated/prisma/enums";

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
			let mergedSkills: string[] | undefined;
			if (skills !== undefined) {
				const existing = await tx.technicianProfile.findUnique({
					where: { id: isTechnician.id },
					select: { skills: { select: { id: true } } },
				});
				const existingIds = existing?.skills.map((s) => s.id) || [];
				mergedSkills = [...new Set([...existingIds, ...skills])];
			}

			await tx.technicianProfile.update({
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
								? new Date(`1970-01-01T${slot.startTime}:00Z`)
								: null,
							endTime: slot.endTime
								? new Date(`1970-01-01T${slot.endTime}:00Z`)
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
				include: {
					skills: true,
					availability: true,
					regions: true,
				},
			});

			if (!tech) {
				throw new AppError(
					httpStatus.INTERNAL_SERVER_ERROR,
					"Failed to retrieve updated technician profile",
				);
			}

			const isProfileCompleted = Boolean(
				tech.phone &&
				tech.address &&
				tech.nid &&
				tech.skills.length > 0 &&
				tech.availability.length > 0 &&
				tech.regions.length > 0,
			);

			await tx.technicianProfile.update({
				where: {
					id: tech.id,
				},
				data: {
					isProfileCompleted,
				},
			});

			return {
				...tech,
				availability: tech.availability.map((slot) => ({
					...slot,
					startTime: formatTimeToHHmm(slot.startTime),
					endTime: formatTimeToHHmm(slot.endTime),
				})),
				isProfileCompleted,
			};
		},
		{ maxWait: 30000, timeout: 50000 },
	);

	return transactionResult;
};


//& Helper: parse comma-separated query param into clean string array
const parseCsv = (v: unknown): string[] => {
	if (!v) return [];
	const raw = Array.isArray(v) ? v.join(",") : String(v);
	return raw
		.split(",")
		.map((s) => s.trim())
		.filter(Boolean);
};

//& GET ALL TECHNICIAN (PUBLIC)
const getAllTech = async (query: IQuery) => {
	const sort = query.sortBy ? query.sortBy : "createdAt";
	const order = query.sortOrder ? query.sortOrder : "desc";
	const page = Number(query.page || 1);
	const limit = Number(query.limit || 20);

	const andConditions: TechnicianProfileWhereInput[] = [
		{
			isDeleted: false
		},
		{
			user: {
				emailVerified: true,
				status: UserStatus.ACTIVE,
				isDeleted: false,
			}
		},
		{
			isProfileCompleted: true
		}
	];

	if (query.search) {
		andConditions.push({
			OR: [
				{
					user: {
						name: {
							contains: query.search,
							mode: "insensitive",
						},
					}
				},
				{
					user: {
						email: {
							contains: query.search,
							mode: 'insensitive'
						}
					}
				},
			],
		});
	}

	if (query.status) {
		andConditions.push({
			status: query.status
		})
	}


	if (query.minJobsCompleted || query.maxJobsCompleted) {
		andConditions.push({
			jobsCompleted: {
				...(query.minJobsCompleted && { gte: Number(query.minJobsCompleted) }),
				...(query.maxJobsCompleted && { lte: Number(query.maxJobsCompleted) }),
			},
		});
	}


	if (query.minRating || query.maxRating) {
		andConditions.push({
			rating: {
				...(query.minRating && { gte: Number(query.minRating) }),
				...(query.maxRating && { lte: Number(query.maxRating) }),
			},
		});
	}


	const skillNames = parseCsv(query.skills ?? query.skill);
	if (skillNames.length > 0) {
		andConditions.push({
			skills: {
				some: {
					name: { in: skillNames, mode: "insensitive" },
					isActive: true,
				},
			},
		});
	}


	const regionNames = parseCsv(query.regions ?? query.region);
	if (regionNames.length > 0) {
		andConditions.push({
			regions: {
				some: {
					area: { in: regionNames, mode: "insensitive" },
					isActive: true,
				},
			},
		});
	}


	const dowList = parseCsv(query.dayOfWeek ?? query.dayofweek ?? query.dow)
		.map(Number)
		.filter((n) => Number.isInteger(n) && n >= 0 && n <= 6);

	if (dowList.length > 0) {
		andConditions.push({
			availability: {
				some: {
					isActive: true,
					type: { not: "BLOCKED" },
					dayOfWeek: { in: dowList },
				},
			},
		});
	}

	const technicians = await prisma.technicianProfile.findMany({
		where: {
			AND: andConditions,
		},
		take: limit,
		skip: (page - 1) * limit,
		orderBy: {
			[sort]: order,
		},
		include: {
			user: {
				select: {
					id: true,
					name: true,
					email: true,
					profileImg: true
				}
			},
			skills: { select: { id: true, name: true } },
			regions: { select: { id: true, area: true } },
			availability: {
				where: { isActive: true },
				select: {
					id: true,
					type: true,
					dayOfWeek: true,
					startTime: true,
					endTime: true,
				},
			},
		},
	});

	const total = await prisma.technicianProfile.count({
		where: {
			AND: andConditions,
		},
	});

	const meta = {
		total,
		page,
		limit,
		totalPages: Math.ceil(total / limit),
	};

	return {
		technicians: technicians.map((tech) => ({
			...tech,
			availability: tech.availability.map((slot) => ({
				...slot,
				startTime: formatTimeToHHmm(slot.startTime),
				endTime: formatTimeToHHmm(slot.endTime),
			})),
		})),
		meta,
	};
};


//& GET SINGLE TECHNICIAN BY ID (PUBLIC)
const getTechById = async (technicianId: string) => {
	const technician = await prisma.technicianProfile.findUnique({
		where: {
			id: technicianId,
			isDeleted: false,
			isProfileCompleted: true,
			user: {
				emailVerified: true,
				status: UserStatus.ACTIVE,
				isDeleted: false,
			},
		},
		include: {
			user: {
				omit: { password: true },
			},
			skills: { select: { id: true, name: true, icon: true } },
			regions: { select: { id: true, area: true } },
			availability: {
				where: { isActive: true },
				select: {
					id: true,
					type: true,
					dayOfWeek: true,
					date: true,
					startTime: true,
					endTime: true,
				},
			},
		},
	});

	if (!technician) {
		throw new AppError(httpStatus.NOT_FOUND, "technician not found");
	}

	return {
		...technician,
		availability: technician.availability.map((slot) => ({
			...slot,
			startTime: formatTimeToHHmm(slot.startTime),
			endTime: formatTimeToHHmm(slot.endTime),
		})),
	};
};


export const technicianService = {
	completeProfile,
	getAllTech,
	getTechById
};
