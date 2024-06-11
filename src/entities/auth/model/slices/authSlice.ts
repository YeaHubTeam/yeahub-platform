import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AuthState, GetProfileApiResponse } from '../types/authTypes';

const initialState: AuthState = {
	accessToken: null,
	profileDetail: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAccessToken: (state, action: PayloadAction<string | null>) => {
			state.accessToken = action.payload;
		},
		setProfileDetail: (state, action: PayloadAction<GetProfileApiResponse | null>) => {
			state.profileDetail = action.payload;
		},
	},
});

export const { setProfileDetail, setAccessToken } = authSlice.actions;
