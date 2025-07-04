import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ActiveSubscriptionState, UserSubscription } from '../types/subscription';

const initialState: ActiveSubscriptionState = {
	subscription: null,
};

export const activeSubscriptionSlice = createSlice({
	name: 'subscription',
	initialState,
	reducers: {
		setActiveSubscription: (
			state,
			action: PayloadAction<{
				subscription: UserSubscription;
			}>,
		) => {
			state.subscription = action.payload.subscription;
		},
	},
});

export const { setActiveSubscription } = activeSubscriptionSlice.actions;
