import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SelectedAdminEntities } from '@/shared/types/types';

import { deleteMultipleSpecializations } from '@/features/specialization/deleteSpecializations';

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
			state.selectedSpecializations = [];
		},
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
		setSelectedSpecializations: (state, action: PayloadAction<SelectedAdminEntities>) => {
			state.selectedSpecializations = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(deleteMultipleSpecializations.fulfilled, (state) => {
			state.selectedSpecializations = [];
		});
	},
});

export const { reducer: specializationsPageReducer, actions: specializationsPageActions } =
	specializationsPageSlice;
