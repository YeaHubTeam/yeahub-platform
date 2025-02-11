import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CollectionTariff } from '@/entities/collection';

import { CollectionsPageState } from '../types/collectionsPageType';

type SpecializationType = string[] | undefined;

const initialState: CollectionsPageState = {
	page: 1,
	title: undefined,
	specialization: undefined,
	access: 'free',
};

const collectionsPageSlice = createSlice({
	name: 'collectionsPage',
	initialState,
	reducers: {
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
		setTitle: (state, action: PayloadAction<string>) => {
			state.title = action.payload;
			state.page = 1;
		},
		setSkills: (state, action: PayloadAction<SpecializationType>) => {
			state.specialization = action.payload;
			state.page = 1;
		},
		setStatus: (state, action: PayloadAction<CollectionTariff>) => {
			state.access = action.payload;
			state.page = 1;
		},
		resetFilters: () => initialState,
	},
});

export const { reducer: questionsPageReducer, actions: questionsPageActions } =
	collectionsPageSlice;
