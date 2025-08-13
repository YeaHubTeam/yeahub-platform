import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { clearStore } from '@/shared/config/store/clearStore';
import { SelectedAdminEntities } from '@/shared/types/types';

import { ResourcesTablePageState } from '../types/resourcesTablePageTypes';

const initialState: ResourcesTablePageState = {
	page: 1,
	selectedResources: [],
	search: '',
};

const resourcesTablePageSlice = createSlice({
	name: 'resourcesTablePage',
	initialState,
	reducers: {
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
			state.selectedResources = [];
		},
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
		setSelectedResources: (state, action: PayloadAction<SelectedAdminEntities>) => {
			state.selectedResources = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(clearStore, () => {
			return initialState;
		});
	},
});

export const { reducer: resourcesTablePageReducer, actions: resourcesTablePageActions } =
	resourcesTablePageSlice;
