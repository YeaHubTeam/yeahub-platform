import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SelectedAdminEntities } from '@/shared/types/types';

import { CollectionsPageState } from '../types/collectionsPageTypes';

const initialState: CollectionsPageState = {
	selectedCollections: [],
};

const collectionsPageSlice = createSlice({
	name: 'collectionsPage',
	initialState,
	reducers: {
		setSelectedCollections: (state, action: PayloadAction<SelectedAdminEntities>) => {
			state.selectedCollections = action.payload;
		},
	},
});

export const { reducer: collectionsPageReducer, actions: collectionsPageActions } =
	collectionsPageSlice;
