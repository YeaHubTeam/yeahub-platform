import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { QuestionsPageState } from '../types/questionsPageTypes';

const initialState: QuestionsPageState = {
	page: 1,
	selectedQuestions: [],
	search: '',
};

const questionsPageSlice = createSlice({
	name: 'questionsPage',
	initialState,
	reducers: {
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
		setSelectedQuestions: (state, action: PayloadAction<string[]>) => {
			state.selectedQuestions = action.payload;
		},
	},
});

export const { reducer: questionsPageReducer, actions: questionsPageActions } = questionsPageSlice;
