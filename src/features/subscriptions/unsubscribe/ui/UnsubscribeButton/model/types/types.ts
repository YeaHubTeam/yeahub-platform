import { ModalProps } from '@/shared/ui/Modal';

export interface UnsubscribeParams {
	subscriptionId?: string;
	userId: string;
	orderId?: string;
}

export interface UnsubscribeResponse {
	message: string;
	status: number;
}

export interface SubscriptionInfoParams {
	userId: string;
}

interface PermissionResponse {
	id: string;
	name: string;
}

interface GetRoleResponse {
	id: string;
	name: string;
	permissions: PermissionResponse[];
}

interface GetSubscriptionResponse {
	id: string;
	name: string;
	pricePerMonth: number;
	description?: string;
	roles: GetRoleResponse[];
}

export interface SubscriptionInfoResponse {
	id: string;
	subscriptionId: string;
	userId: string;
	createDate: string;
	endDate?: string;
	subscription: GetSubscriptionResponse;
}

export type UnsubscribeModalProps = Pick<ModalProps, 'isOpen' | 'onClose'>;
