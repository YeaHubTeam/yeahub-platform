import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { clearStore } from '@/shared/config';
import { SelectedAdminEntities } from '@/shared/libs';

import { deleteMultipleCompaniesThunk } from '@/features/company/deleteCompanies';

import { CompaniesPageState } from '../types/companiesPageTypes';

const initialState: CompaniesPageState = {
	selectedCompanies: [],
};

const companiesPageSlice = createSlice({
	name: 'companiesPage',
	initialState,
	reducers: {
		setSelectedCompanies: (state, action: PayloadAction<SelectedAdminEntities<string>>) => {
			state.selectedCompanies = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(deleteMultipleCompaniesThunk.fulfilled, (state) => {
			state.selectedCompanies = [];
		});
		builder.addCase(clearStore, () => {
			return initialState;
		});
	},
});

export const { reducer: companiesPageReducer, actions: companiesPageActions } = companiesPageSlice;
