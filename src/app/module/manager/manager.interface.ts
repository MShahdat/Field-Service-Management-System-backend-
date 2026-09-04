import { ManagerVerificationStatus } from "../../../../generated/prisma/enums";

interface Address {
	[key: string]: string;
}

export interface IManagerApplyPayload {
	user: {
		name: string;
		email: string;
	};
	manager: {
		phone: string;
		address: Address;
		nid: string;
		region: string[];
	};
}

export interface EmailVerify {
	email: string;
	otp: string;
}

export interface IApproveManager {
	email: string;
	verificationStatus: ManagerVerificationStatus;
	rejectionReason?: string;
}
