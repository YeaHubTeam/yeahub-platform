import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SpecializationsPageState } from '../types/specializationsPageTypes';

const initialState: SpecializationsPageState = {
	page: 1,
	selectedSpecializations: [],
	search: '',
};

const specializationsPageSlice = createSlice({
	name: 'specializationsPage',
	initialState,
	reducers: {
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
		setSelectedSpecializations: (state, action: PayloadAction<number[]>) => {
			state.selectedSpecializations = action.payload;
		},
	},
});

export const { reducer: specializationsPageReducer, actions: specializationsPageActions } =
	specializationsPageSlice;
