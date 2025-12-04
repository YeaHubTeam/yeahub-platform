import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { clearStore } from '@/shared/config';
import { SelectedAdminEntities } from '@/shared/libs';

import { deleteMultipleSpecializationsThunk } from '@/features/specialization/deleteSpecializations';

import { SpecializationsPageState } from '../types/specializationsPageTypes';

const initialState: SpecializationsPageState = {
	selectedSpecializations: [],
};

const specializationsPageSlice = createSlice({
	name: 'specializationsPage',
	initialState,
	reducers: {
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
