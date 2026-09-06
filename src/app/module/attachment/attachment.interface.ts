import { AttachmentType } from "../../../../generated/prisma/enums";

export interface IAttachmentPayload {
	workOrderId: string;
	description?: string;
	type: AttachmentType;
}

export interface IUpdateAttachmentPayload {
	description?: string;
	type?: AttachmentType;
}
