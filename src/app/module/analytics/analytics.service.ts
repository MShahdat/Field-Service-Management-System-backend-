import {
	PaymentStatus,
	ServiceStatus,
	WorkOrderStatus,
} from "../../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const getCurrentMonthRange = () => {
	const now = new Date();
	const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
	const endOfMonth = new Date(
		now.getFullYear(),
		now.getMonth() + 1,
		0,
		23,
		59,
		59,
		999,
	);
	return { startOfMonth, endOfMonth };
};

//& ADMIN ANALYTICS
const getAdminAnalytics = async () => {
	const { startOfMonth, endOfMonth } = getCurrentMonthRange();

	const totalCustomers = await prisma.customerProfile.count({
		where: { isDeleted: false },
	});
	const totalManagers = await prisma.managerProfile.count({
		where: { isDeleted: false },
	});
	const totalTechnicians = await prisma.technicianProfile.count({
		where: { isDeleted: false },
	});

	const rejectedManagers = await prisma.managerProfile.count({
		where: {
			verificationStatus: "REJECTED",
			isDeleted: false,
		},
	});
	const pendingManagers = await prisma.managerProfile.count({
		where: {
			verificationStatus: "PENDING",
			isDeleted: false,
		},
	});

	const totalServices = await prisma.service.count({
		where: { isDeleted: false },
	});
	const cancelledServices = await prisma.service.count({
		where: {
			status: "CANCELLED",
			isDeleted: false,
		},
	});
	const pendingServices = await prisma.service.count({
		where: {
			status: "PENDING",
			isDeleted: false,
		},
	});
	const rejectedServices = await prisma.service.count({
		where: {
			status: ServiceStatus.REJECTED,
			isDeleted: false,
		},
	});

	const totalWorkOrders = await prisma.workOrder.count();

	const totalRevenue = await prisma.payment.aggregate({
		where: {
			status: PaymentStatus.PAID,
		},
		_sum: { amount: true },
	});
	const totalRefunded = await prisma.payment.aggregate({
		where: {
			status: PaymentStatus.REFUNDED,
		},
		_sum: { amount: true },
	});
	const currentMonthRevenue = await prisma.payment.aggregate({
		where: {
			status: PaymentStatus.PAID,
			paidAt: {
				gte: startOfMonth,
				lte: endOfMonth,
			},
		},
		_sum: { amount: true },
	});

	return {
		totalCustomers,
		totalManagers,
		totalTechnicians,
		rejectedManagers,
		pendingManagers,
		totalServices,
		cancelledServices,
		pendingServices,
		rejectedServices,
		totalWorkOrders,
		totalRevenue: totalRevenue._sum.amount?.toString() ?? "0",
		totalRefunded: totalRefunded._sum.amount?.toString() ?? "0",
		currentMonthRevenue: currentMonthRevenue._sum.amount?.toString() ?? "0",
	};
};

//& CUSTOMER ANALYTICS
const getCustomerAnalytics = async (userId: string) => {
	const customer = await prisma.customerProfile.findUnique({
		where: { userId },
		select: { id: true },
	});

	if (!customer) {
		return {
			totalServices: 0,
			cancelledServices: 0,
			pendingServices: 0,
			completedServices: 0,
			completedWorkOrders: 0,
			totalSpend: "0",
			totalRefund: "0",
		};
	}

	const totalServices = await prisma.service.count({
		where: { customerId: customer.id, isDeleted: false },
	});
	const cancelledServices = await prisma.service.count({
		where: {
			customerId: customer.id,
			status: ServiceStatus.CANCELLED,
			isDeleted: false,
		},
	});
	const pendingServices = await prisma.service.count({
		where: {
			customerId: customer.id,
			status: ServiceStatus.PENDING,
			isDeleted: false,
		},
	});
	const completedServices = await prisma.service.count({
		where: {
			customerId: customer.id,
			status: ServiceStatus.COMPLETED,
			isDeleted: false,
		},
	});

	const completedWorkOrders = await prisma.workOrder.count({
		where: {
			customerId: customer.id,
			status: WorkOrderStatus.COMPLETED,
		},
	});

	const totalSpend = await prisma.payment.aggregate({
		where: {
			workOrder: { customerId: customer.id },
			status: PaymentStatus.PAID,
		},
		_sum: { amount: true },
	});
	const totalRefund = await prisma.payment.aggregate({
		where: {
			workOrder: { customerId: customer.id },
			status: PaymentStatus.REFUNDED,
		},
		_sum: { amount: true },
	});

	return {
		totalServices,
		cancelledServices,
		pendingServices,
		completedServices,
		completedWorkOrders,
		totalSpend: totalSpend._sum.amount?.toString() ?? "0",
		totalRefund: totalRefund._sum.amount?.toString() ?? "0",
	};
};

//& TECHNICIAN ANALYTICS

const getTechnicianAnalytics = async (userId: string) => {
	const technicianProfile = await prisma.technicianProfile.findUnique({
		where: { userId },
		select: {
			id: true,
			regions: { select: { id: true } },
			rating: true,
		},
	});

	if (!technicianProfile) {
		return {
			completedWorkOrders: 0,
			startedWorkOrders: 0,
			totalEarnings: "0",
			totalRefunded: "0",
			coverRegions: 0,
			completeJobs: 0,
			avgRating: 0,
		};
	}

	const technicianId = technicianProfile.id;

	const completedWorkOrders = await prisma.workOrder.count({
		where: {
			technicianId,
			status: WorkOrderStatus.COMPLETED,
		},
	});
	const startedWorkOrders = await prisma.workOrder.count({
		where: {
			technicianId,
			status: {
				in: [WorkOrderStatus.EN_ROUTE, WorkOrderStatus.STARTED],
			},
		},
	});

	const totalEarnings = await prisma.payment.aggregate({
		where: {
			workOrder: { technicianId },
			status: PaymentStatus.PAID,
		},
		_sum: { amount: true },
	});
	const totalRefunded = await prisma.payment.aggregate({
		where: {
			workOrder: { technicianId },
			status: PaymentStatus.REFUNDED,
		},
		_sum: { amount: true },
	});

	const completeJobs = await prisma.workOrder.count({
		where: { technicianId, status: WorkOrderStatus.COMPLETED },
	});

	return {
		completedWorkOrders,
		startedWorkOrders,
		totalEarnings: totalEarnings._sum.amount?.toString() ?? "0",
		totalRefunded: totalRefunded._sum.amount?.toString() ?? "0",
		coverRegions: technicianProfile?.regions.length ?? 0,
		completeJobs,
		avgRating: technicianProfile?.rating ?? 0,
	};
};

//& MANAGER ANALYTICS
const getManagerAnalytics = async (userId: string) => {
	const manager = await prisma.managerProfile.findUnique({
		where: { userId },
		select: {
			id: true,
			region: { select: { id: true, area: true } },
		},
	});

	if (!manager) {
		return {
			coverRegions: 0,
			approvedServices: 0,
			rejectedServices: 0,
			completedWorkByTechnicians: 0,
			totalEarnings: "0",
			totalRefunded: "0",
		};
	}

	const regionIds = manager.region.map((r) => r.id);
	const managesAllRegions = manager.region.some(
		(region) => region.area.toUpperCase() === "ALL",
	);
	const serviceRegionFilter = managesAllRegions
		? {}
		: { regionId: { in: regionIds } };

	const approvedServices = await prisma.service.count({
		where: {
			...serviceRegionFilter,
			status: ServiceStatus.APPROVED,
			isDeleted: false,
		},
	});
	const rejectedServices = await prisma.service.count({
		where: {
			...serviceRegionFilter,
			status: ServiceStatus.REJECTED,
			isDeleted: false,
		},
	});

	const completedWorkByTechnicians = await prisma.workOrder.count({
		where: {
			managerId: manager.id,
			status: WorkOrderStatus.COMPLETED,
		},
	});

	const totalEarnings = await prisma.payment.aggregate({
		where: {
			workOrder: {
				managerId: manager.id,
			},
			status: PaymentStatus.PAID,
		},
		_sum: { amount: true },
	});
	const totalRefunded = await prisma.payment.aggregate({
		where: {
			workOrder: { managerId: manager.id },
			status: PaymentStatus.REFUNDED,
		},
		_sum: { amount: true },
	});

	return {
		coverRegions: regionIds.length,
		approvedServices,
		rejectedServices,
		completedWorkByTechnicians,
		totalEarnings: totalEarnings._sum.amount?.toString() ?? "0",
		totalRefunded: totalRefunded._sum.amount?.toString() ?? "0",
	};
};

export const analyticsService = {
	getAdminAnalytics,
	getCustomerAnalytics,
	getManagerAnalytics,
	getTechnicianAnalytics,
};
