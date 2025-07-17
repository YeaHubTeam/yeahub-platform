import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { clearStore } from '@/shared/config/store/clearStore';

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
	extraReducers: (builder) => {
		builder.addCase(clearStore, () => {
			return initialState;
		});
	},
});

export const { reducer: usersPageReducer, actions: usersPageActions } = usersPageSlice;
