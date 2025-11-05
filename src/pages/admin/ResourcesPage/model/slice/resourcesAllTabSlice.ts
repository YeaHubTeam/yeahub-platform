import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { clearStore } from '@/shared/config/store/clearStore';
import { SelectedAdminEntities } from '@/shared/types/types';

import { ResourcesAllTabState } from '../types/resourcesAllTabTypes';

const initialState: ResourcesAllTabState = {
	selectedResources: [],
};

const resourcesAllTabSlice = createSlice({
	name: 'resourcesAllTab',
	initialState,
	reducers: {
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
