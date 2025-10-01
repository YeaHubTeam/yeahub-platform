import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { clearStore } from '@/shared/config/store/clearStore';

import { SelectedResourceRequestEntities } from '@/entities/resource';

import { ResourcesRequestsTablePageState } from '../types/resourcesRequestsTablePageTypes';

const initialState: ResourcesRequestsTablePageState = {
	page: 1,
	selectedResourcesRequests: [],
	search: '',
};

const resourcesRequestsTablePageSlice = createSlice({
	name: 'resourcesRequestsTablePage',
	initialState,
	reducers: {
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
			state.selectedResourcesRequests = [];
		},
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
			state.selectedResourcesRequests = [];
		},
		setSelectedResourceRequests: (
			state,
			action: PayloadAction<SelectedResourceRequestEntities>,
		) => {
			state.selectedResourcesRequests = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(clearStore, () => initialState);
	},
});

export const {
	reducer: resourcesRequestsTablePageReducer,
	actions: resourcesRequestsTablePageActions,
} = resourcesRequestsTablePageSlice;
