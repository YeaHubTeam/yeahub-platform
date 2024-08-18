import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthState, GetLoginResponse, GetProfileResponse } from '../types/auth';

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		accessToken: localStorage.getItem('accessToken') || '',
		profile: null,
		error: null,
	} as AuthState,
	reducers: {
		setUserData: (state, action: PayloadAction<GetProfileResponse>) => {
			state.profile = action.payload;
			state.error = null;
		},
		setAccessToken: (state, action: PayloadAction<GetLoginResponse>) => {
			const accessToken = action.payload.access_token;
			state.accessToken = accessToken;
			localStorage.setItem('accessToken', accessToken);
		},
		logOut: (state) => {
			state.accessToken = '';
			state.profile = null;
			localStorage.removeItem('accessToken');
		},
		catchError: (state, action: PayloadAction<number>) => {
			state.error = action.payload;
		},
	},
});

export const { reducer: authReducer, actions: authActions } = authSlice;
