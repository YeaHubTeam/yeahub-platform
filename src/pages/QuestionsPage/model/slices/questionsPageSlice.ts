import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { QuestionsPageState } from '../types/questionsPageType';

const initialState: QuestionsPageState = {
	page: 1,
};

const questionsPageSlice = createSlice({
	name: 'questionsPage',
	initialState,
	reducers: {
		setQuestionPageState: (state, action: PayloadAction<QuestionsPageState>) => {
			return { ...state, ...action.payload };
		},
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
	},
});

export const { reducer: questionsPageReducer, actions: questionsPageActions } = questionsPageSlice;
