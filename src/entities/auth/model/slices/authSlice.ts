import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AuthState, GetProfileApiResponse } from '../types/authTypes';

const initialState: AuthState = {
	profileDetail: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setProfileDetail: (state, action: PayloadAction<GetProfileApiResponse>) => {
			state.profileDetail = action.payload;
		},
	},
});

export const { setProfileDetail } = authSlice.actions;
