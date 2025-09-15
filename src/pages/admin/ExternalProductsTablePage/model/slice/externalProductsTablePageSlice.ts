import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { clearStore } from '@/shared/config/store/clearStore';
import { SelectedAdminEntities } from '@/shared/types/types';

import { ExternalProductsTablePageState } from '../types/externalProductsTablePageTypes';

const initialState: ExternalProductsTablePageState = {
	page: 1,
	selectedExternalProducts: [],
	search: '',
};

const externalProductsTablePageSlice = createSlice({
	name: 'externalProductsTablePage',
	initialState,
	reducers: {
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
			state.selectedExternalProducts = [];
		},
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
		setSelectedExternalProducts: (state, action: PayloadAction<SelectedAdminEntities>) => {
			state.selectedExternalProducts = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(clearStore, () => {
			return initialState;
		});
	},
});

export const {
	reducer: externalProductsTablePageReducer,
	actions: externalProductsTablePageActions,
} = externalProductsTablePageSlice;
