import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { clearStore } from '@/shared/config';

import { SelectedResourceRequestEntities } from '@/entities/resource';

import { ResourcesRequestsTabState } from '../types/resourcesRequestsTabTypes';

const initialState: ResourcesRequestsTabState = {
	selectedResourcesRequests: [],
};

const resourcesRequestsTabSlice = createSlice({
	name: 'resourcesRequestsTab',
	initialState,
	reducers: {
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
