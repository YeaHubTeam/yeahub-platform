import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { QuestionsPageState } from '../types/questionsPageType';

const initialState: QuestionsPageState = {
	page: 1,
	skill: [1, 2, 5, 6, 7, 8, 9, 10, 11, 12, 13],
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
		setSkill: (state, action: PayloadAction<number[]>) => {
			state.skill = { ...state.skill, ...action.payload };
		},
	},
});

export const { reducer: questionsPageReducer, actions: questionsPageActions } = questionsPageSlice;
