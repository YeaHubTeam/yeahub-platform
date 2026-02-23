import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SelectedAdminEntities } from '@/shared/libs';

import { TopicsPageState } from '../types/topicsPageTypes';

const initialState: TopicsPageState = {
	selectedTopics: [],
};

const TopicsPageSlice = createSlice({
	name: 'TopicsPage',
	initialState,
	reducers: {
		setSelectedTopics: (state, action: PayloadAction<SelectedAdminEntities>) => {
			state.selectedTopics = action.payload;
		},
		clearSelectedTopics: (state) => {
			state.selectedTopics = [];
		},
	},
});

export const { reducer: topicsPageReducer, actions: topicsPageActions } = TopicsPageSlice;
