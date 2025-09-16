import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { clearStore } from '@/shared/config/store/clearStore';

import { SelectedResourceRequestEntities } from '@/entities/resource';

import { ResourceRequestsPageState } from '../types/resourceRequestsPageTypes';

const initialState: ResourceRequestsPageState = {
	page: 1,
	selectedResourceRequests: [],
	search: '',
};

const resourceRequestsPageSlice = createSlice({
	name: 'resourceRequestsPage',
	initialState,
	reducers: {
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
			state.selectedResourceRequests = [];
		},
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
			state.selectedResourceRequests = [];
		},
		setSelectedResourceRequests: (
			state,
			action: PayloadAction<SelectedResourceRequestEntities>,
		) => {
			state.selectedResourceRequests = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(clearStore, () => initialState);
	},
});

export const { reducer: resourceRequestsPageReducer, actions: resourceRequestsPageActions } =
	resourceRequestsPageSlice;
