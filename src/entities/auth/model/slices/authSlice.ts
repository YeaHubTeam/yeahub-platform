import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { TNullable } from '@/shared/types/types';

import { AuthState, GetProfileApiResponse } from '../types/authTypes';

const initialState: AuthState = {
	accessToken: null,
	profile: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAccessToken: (state, action: PayloadAction<TNullable<string>>) => {
			state.accessToken = action.payload;
		},
		setProfile: (state, action: PayloadAction<TNullable<GetProfileApiResponse>>) => {
			state.profile = action.payload;
		},
	},
});

export const { setProfile, setAccessToken } = authSlice.actions;
