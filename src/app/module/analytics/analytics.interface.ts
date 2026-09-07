export interface IAdminAnalytics {
	totalCustomers: number;
	totalManagers: number;
	totalTechnicians: number;
	rejectedManagers: number;
	pendingManagers: number;
	totalServices: number;
	cancelledServices: number;
	pendingServices: number;
	rejectedServices: number;
	totalWorkOrders: number;
	totalRevenue: string;
	totalRefunded: string;
	currentMonthRevenue: string;
}

export interface ICustomerAnalytics {
	totalServices: number;
	cancelledServices: number;
	pendingServices: number;
	completedServices: number;
	completedWorkOrders: number;
	totalSpend: string;
	totalRefund: string;
}

export interface ITechnicianAnalytics {
	completedWorkOrders: number;
	startedWorkOrders: number;
	totalEarnings: string;
	totalRefunded: string;
	coverRegions: number;
	completeJobs: number;
	avgRating: number;
}

export interface IManagerAnalytics {
	coverRegions: number;
	approvedServices: number;
	rejectedServices: number;
	completedWorkByTechnicians: number;
	totalEarnings: string;
	totalRefunded: string;
}
