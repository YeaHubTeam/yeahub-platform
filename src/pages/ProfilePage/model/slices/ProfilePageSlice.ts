import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProfilePageState } from '../types/ProfilePageTypes';

const initialState: ProfilePageState = {
	profileId: undefined,
};

const ProfilePageSlice = createSlice({
	name: 'profilePage',
	initialState,
	reducers: {
		setProfileId: (state, action: PayloadAction<string>) => {
			state.profileId = action.payload;
		},
	},
});

export const { reducer: profilePageReducer, actions: profilePageActions } = ProfilePageSlice;
