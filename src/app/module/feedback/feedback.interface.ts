export interface IFeedbackPayload {
	workOrderId: string;
	rating: number;
	comment: string;
}

export interface IFeedbackUpdatePayload {
	rating?: number;
	comment?: string;
}
