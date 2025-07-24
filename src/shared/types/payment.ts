export type PaymentStatus = 'CONFIRMED' | 'AUTHORIZED';

export interface Payment {
	status: PaymentStatus;
	rebillId?: string | null;
	createdAt: string;
	orderId: string;
	paymentId?: string | null;
}
