import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { QuestionsPageState } from '../types/questionsPageType';

const initialState: QuestionsPageState = {
	page: 1,
	title: '',
	skill: [],
	rate: [],
	rating: [],
	progressStatus: [], //not implemented on BE side
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
		setSkills: (state, action: PayloadAction<number[]>) => {
			state.skill = action.payload;
		},
		setComplexity: (state, action: PayloadAction<number[]>) => {
			state.rate = action.payload;
		},
		setRate: (state, action: PayloadAction<number[]>) => {
			state.rating = action.payload;
		},
		setStatus: (state, action: PayloadAction<number[]>) => {
			state.progressStatus = action.payload;
		},
	},
});

export const { reducer: questionsPageReducer, actions: questionsPageActions } = questionsPageSlice;
