import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { clearStore } from '@/shared/config/store/clearStore';
import { SelectedAdminEntities } from '@/shared/types/types';

import { deleteMultipleSpecializationsThunk } from '@/features/specialization/deleteSpecializations';

import { SpecializationsPageState } from '../types/specializationsPageTypes';

const initialState: SpecializationsPageState = {
	page: 1,
	selectedSpecializations: [],
	search: '',
	author: '',
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
		setAuthor: (state, action: PayloadAction<string>) => {
			state.author = action.payload;
		},
		setSelectedSpecializations: (state, action: PayloadAction<SelectedAdminEntities>) => {
			state.selectedSpecializations = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(deleteMultipleSpecializationsThunk.fulfilled, (state) => {
			state.selectedSpecializations = [];
		});
		builder.addCase(clearStore, () => {
			return initialState;
		});
	},
});

export const { reducer: specializationsPageReducer, actions: specializationsPageActions } =
	specializationsPageSlice;
