import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ActivePaymentState, Payment } from '../types/payments';

const initialState: ActivePaymentState = {
	payment: null,
	limit: 5,
};

export const activePaymentSlice = createSlice({
	name: 'payment',
	initialState,
	reducers: {
		setActivePayment: (
			state,
			action: PayloadAction<{
				payment: Payment;
			}>,
		) => {
			state.payment = action.payload.payment;
		},
	},
});

export const { setActivePayment } = activePaymentSlice.actions;
