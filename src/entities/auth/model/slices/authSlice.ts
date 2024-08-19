import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthState, GetAuthResponse, GetProfileResponse } from '../types/auth';

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		accessToken: null,
		profile: null,
		error: null,
	} as AuthState,
	reducers: {
		setProfile: (state, action: PayloadAction<GetProfileResponse>) => {
			state.profile = action.payload;
			state.error = null;
		},
		setAccessToken: (state, action: PayloadAction<GetAuthResponse>) => {
			const accessToken = action.payload.access_token;
			state.accessToken = accessToken;
		},
		logOut: (state) => {
			state.accessToken = null;
			state.profile = null;
		},
		catchError: (state, action: PayloadAction<number>) => {
			state.error = action.payload;
		},
	},
});

export const { reducer: authReducer, actions: authActions } = authSlice;
