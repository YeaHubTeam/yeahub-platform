import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { QuestionFilterStatus } from '@/widgets/Question';

import { QuestionsPageState } from '../types/questionsPageType';

const initialState: QuestionsPageState = {
	page: 1,
	title: undefined,
	skills: undefined,
	rate: undefined,
	complexity: undefined,
	status: 'all',
};

const questionsPageSlice = createSlice({
	name: 'questionsPage',
	initialState,
	reducers: {
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
		setTitle: (state, action: PayloadAction<string>) => {
			state.title = action.payload;
		},
		setSkills: (state, action: PayloadAction<number[] | undefined>) => {
			state.skills = action.payload;
		},
		setComplexity: (state, action: PayloadAction<number[]>) => {
			state.complexity = action.payload;
		},
		setRate: (state, action: PayloadAction<number[]>) => {
			state.rate = action.payload;
		},
		setStatus: (state, action: PayloadAction<QuestionFilterStatus>) => {
			state.status = action.payload;
		},
	},
});

export const { reducer: questionsPageReducer, actions: questionsPageActions } = questionsPageSlice;
