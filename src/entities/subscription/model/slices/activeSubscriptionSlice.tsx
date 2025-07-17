import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { clearStore } from '@/shared/config/store/clearStore';

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
	extraReducers: (builder) => {
		builder.addCase(clearStore, () => {
			return initialState;
		});
	},
});

export const { setActiveSubscription } = activeSubscriptionSlice.actions;
