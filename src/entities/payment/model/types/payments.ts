import { Response } from '@/shared/types/types';

export interface GetPaymentDataParamsRequest {
	page?: number;
	limit?: number;
	data: Payment[];
	total: number;
}

export interface Payment {
	status: 'CONFIRMED' | 'AUTHORIZED' | null;
	rebillId: string | null;
	createdAt: string;
	orderId: string;
	paymentId: string | null;
}

export interface PaginationParams {
	page?: number;
	limit?: number;
}

export interface ActivePaymentState {
	payment: Payment | null;
	limit: number;
}

export type GetPaymentsResponse = Response<Payment[]>;
