import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { clearStore } from '@/shared/config';
import { SelectedAdminEntities } from '@/shared/libs';

import { deleteMultipleCompaniesThunk } from '../../lib/thunks/deleteMultipleCompaniesThunk';
import { CompaniesTablePageState } from '../types/companiesTablePageTypes';

const initialState: CompaniesTablePageState = {
	selectedCompanies: [],
};

const companiesTablePageSlice = createSlice({
	name: 'companiesTablePage',
	initialState,
	reducers: {
		setSelectedCompanies: (state, action: PayloadAction<SelectedAdminEntities>) => {
			state.selectedCompanies = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(clearStore, () => {
			return initialState;
		});
		builder.addCase(deleteMultipleCompaniesThunk.fulfilled, (state) => {
			state.selectedCompanies = [];
		});
	},
});

export const { reducer: companiesTablePageReducer, actions: companiesTablePageActions } =
	companiesTablePageSlice;
