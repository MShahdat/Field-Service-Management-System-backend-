interface Address {
	[key: string]: string;
}

export interface IUpdateTechnician {
	phone?: string;
	nid?: string;
	address?: Address;
	bio?: string;
	skills?: string[];
	availability?: string[];
	region?: string[];
}
