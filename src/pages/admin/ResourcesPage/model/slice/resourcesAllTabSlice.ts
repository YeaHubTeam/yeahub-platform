import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { clearStore } from '@/shared/config/store/clearStore';
import { SelectedAdminEntities } from '@/shared/types/types';

import { ResourcesAllTabState } from '../types/resourcesAllTabTypes';

const initialState: ResourcesAllTabState = {
	page: 1,
	selectedResources: [],
	search: '',
};

const resourcesAllTabSlice = createSlice({
	name: 'resourcesAllTab',
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
		builder.addCase(clearStore, () => initialState);
	},
});

export const { reducer: resourcesAllTabReducer, actions: resourcesAllTabActions } =
	resourcesAllTabSlice;
