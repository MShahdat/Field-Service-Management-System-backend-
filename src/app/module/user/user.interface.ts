interface Address {
	[key: string]: string;
}

export interface IUpdateCustomer {
	phone?: string;
	address?: Address;
}
