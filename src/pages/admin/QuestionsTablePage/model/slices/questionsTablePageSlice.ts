import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { QuestionsTablePageState } from '../types/questionsTablePageTypes';

const initialState: QuestionsTablePageState = {
	page: 1,
	selectedQuestions: [],
	search: '',
};

const questionsTablePageSlice = createSlice({
	name: 'questionsPage',
	initialState,
	reducers: {
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
		setSelectedQuestions: (state, action: PayloadAction<number[]>) => {
			state.selectedQuestions = action.payload;
		},
	},
});

export const { reducer: questionsTablePageReducer, actions: questionsTablePageActions } =
	questionsTablePageSlice;
