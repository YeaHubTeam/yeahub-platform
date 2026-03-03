import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { clearStore } from '@/shared/config';
import { SelectedAdminEntities } from '@/shared/libs';
import { ReferralsPageState } from '../types/referralsPageTypes';

const initialState: ReferralsPageState = {
	selectedReferrals: [],
};

const referralsPageSlice = createSlice({
	name: 'referralsPage',
	initialState,
	reducers: {
		setSelectedReferrals: (state, action: PayloadAction<SelectedAdminEntities<string>>) => {
			state.selectedReferrals = action.payload;
		},
		clearSelectedReferrals: (state) => {
			state.selectedReferrals = [];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(clearStore, () => initialState);
	},
});

export const { reducer: referralsPageReducer, actions: referralsPageActions } = referralsPageSlice;
