export type RegisterRole = "CUSTOMER" | "TECHNICIAN";

export interface IRegisterCustomerPayload {
	name: string;
	email: string;
	password: string;
	role: RegisterRole;
}

export interface IVerifyEmailPayload {
	email: string;
	otp: string;
}

export interface ILoginUserPayload {
	email: string;
	password: string;
}

export interface IForgotPasswordPayload {
	email: string;
}

export interface IResetPasswordPayload {
	email: string;
	newPassword: string;
	otp: string;
}
