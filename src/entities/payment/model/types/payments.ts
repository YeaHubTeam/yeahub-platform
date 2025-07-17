import { Response } from '@/shared/types/types';

type PaymentStatus = 'CONFIRMED' | 'AUTHORIZED';

export interface Payment {
	status: PaymentStatus;
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
