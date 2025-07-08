export interface PaymentData {
	status: 'CONFIRMED' | 'AUTHORIZED' | null;
	rebillId: string | null;
	createdAt: string;
	orderId: string;
	paymentId: string | null;
}

export interface Payment {
	page?: number;
	limit?: number;
	data: PaymentData[];
	total: number;
}

export interface PaginationParams {
	page?: number;
	limit?: number;
}

export interface ActivePaymentState {
	payment: Payment | null;
}
