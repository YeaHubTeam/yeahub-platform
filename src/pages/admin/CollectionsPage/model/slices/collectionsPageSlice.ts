import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { clearStore } from '@/shared/config/store/clearStore';
import { SelectedAdminEntities } from '@/shared/types/types';

import { CollectionsPageState } from '../types/collectionsPageTypes';

const initialState: CollectionsPageState = {
	selectedCollections: [],
	search: '',
};

const collectionsPageSlice = createSlice({
	name: 'collectionsPage',
	initialState,
	reducers: {
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
		setSelectedCollections: (state, action: PayloadAction<SelectedAdminEntities>) => {
			state.selectedCollections = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(clearStore, () => {
			return initialState;
		});
	},
});

export const { reducer: collectionsPageReducer, actions: collectionsPageActions } =
	collectionsPageSlice;
