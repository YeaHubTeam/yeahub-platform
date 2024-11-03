import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserState } from '@/entities/profile/model/types/user';

const initialState: UserState = {
	isEmailSent: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setEmailSent(state, action: PayloadAction<boolean>) {
			state.isEmailSent = action.payload;
		},
	},
});

export const { reducer: userReducer, actions: userActions } = userSlice;

export const { setEmailSent } = userSlice.actions;
