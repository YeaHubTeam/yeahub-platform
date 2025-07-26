import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { clearStore } from '@/shared/config/store/clearStore';
import { SelectedAdminEntities } from '@/shared/types/types';

import { deleteMultipleCompaniesThunk } from '@/features/company/deleteCompanies';

import { CompaniesTablePageState } from '../types/companiesTablePageTypes';

const initialState: CompaniesTablePageState = {
	page: 1,
	selectedCompanies: [],
	search: '',
};

const companiesTablePageSlice = createSlice({
	name: 'companiesTablePage',
	initialState,
	reducers: {
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
			state.selectedCompanies = [];
		},
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
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
