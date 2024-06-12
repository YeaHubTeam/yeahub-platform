import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AuthState, GetProfileApiResponse } from '../types/authTypes';

const initialState: AuthState = {
	accessToken: null,
	profile: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAccessToken: (state, action: PayloadAction<string | null>) => {
			state.accessToken = action.payload;
		},
		setProfile: (state, action: PayloadAction<GetProfileApiResponse | null>) => {
			state.profile = action.payload;
		},
	},
});

export const { setProfile, setAccessToken } = authSlice.actions;
