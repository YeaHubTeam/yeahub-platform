import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UsersPageState } from '../types/usersPageTypes';

const initialState: UsersPageState = {
	page: 1,
	search: '',
};

const usersPageSlice = createSlice({
	name: 'usersPage',
	initialState,
	reducers: {
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
	},
});

export const { reducer: usersPageReducer, actions: usersPageActions } = usersPageSlice;
