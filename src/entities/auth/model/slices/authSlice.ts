import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { GetProfileApiResponse } from '../types/authTypes';

interface State {
	profileDetail: GetProfileApiResponse | null;
}

const initialState: State = {
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
