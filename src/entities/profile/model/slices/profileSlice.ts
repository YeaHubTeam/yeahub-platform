import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProfileState } from '@/entities/profile/model/types/profile';

const initialState: ProfileState = {
	isEmailSent: false,
	fullProfile: null,
};

export const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		setEmailSent(state, action: PayloadAction<boolean>) {
			state.isEmailSent = action.payload;
		},
		setProfile(state, action) {
			state.fullProfile = action.payload;
		},
	},
});

export const { reducer: profileReducer, actions: profileActions } = profileSlice;

export const { setEmailSent, setProfile } = profileSlice.actions;
