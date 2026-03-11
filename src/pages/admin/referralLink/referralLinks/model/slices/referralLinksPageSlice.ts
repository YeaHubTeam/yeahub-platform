import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { clearStore } from '@/shared/config';
import { SelectedAdminEntities } from '@/shared/libs';

import { ReferralLinksPageState } from '../types/referralLinksPageTypes';

const initialState: ReferralLinksPageState = {
	selectedReferralLinks: [],
};

const referralLinksPageSlice = createSlice({
	name: 'referralLinksPage',
	initialState,
	reducers: {
		setSelectedReferralLinks: (state, action: PayloadAction<SelectedAdminEntities<string>>) => {
			state.selectedReferralLinks = action.payload;
		},
		clearSelectedReferralLinks: (state) => {
			state.selectedReferralLinks = [];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(clearStore, () => initialState);
	},
});

export const { reducer: referralLinksPageReducer, actions: referralLinksPageActions } =
	referralLinksPageSlice;
