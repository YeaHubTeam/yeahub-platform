import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { clearStore } from '@/shared/config/store/clearStore';

import { SelectedResourceRequestEntities } from '@/entities/resource';

import { ResourcesRequestsTabState } from '../types/resourcesRequestsTabTypes';

const initialState: ResourcesRequestsTabState = {
	page: 1,
	selectedResourcesRequests: [],
	search: '',
};

const resourcesRequestsTabSlice = createSlice({
	name: 'resourcesRequestsTab',
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

export const { reducer: resourcesRequestsTabReducer, actions: resourcesRequestsTabActions } =
	resourcesRequestsTabSlice;
