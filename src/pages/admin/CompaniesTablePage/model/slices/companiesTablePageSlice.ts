import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SelectedAdminEntities } from '@/shared/types/types';

import { ICompaniesTablePageState } from '../types/companiesTablePageTypes';

const initialState: ICompaniesTablePageState = {
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
});

export const { reducer: companiesTablePageReducer, actions: companiesTablePageActions } =
	companiesTablePageSlice;
