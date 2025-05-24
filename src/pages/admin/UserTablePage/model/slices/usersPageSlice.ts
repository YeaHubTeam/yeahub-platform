import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UsersPageState } from '../types/usersPageTypes';

const initialState: UsersPageState = {
	page: 1,
};

const usersPageSlice = createSlice({
	name: 'usersPage',
	initialState,
	reducers: {
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
	},
});

export const { reducer: usersPageReducer, actions: usersPageActions } = usersPageSlice;
