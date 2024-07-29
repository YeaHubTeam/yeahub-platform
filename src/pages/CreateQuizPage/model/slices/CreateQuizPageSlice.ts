import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CreateQuizPageState, QuestionModeType } from '../types/CreateQuizPageTypes';

const initialState: CreateQuizPageState = {
	profileId: undefined,
	skills: [],
	complexity: [],
	limit: 1,
	mode: 'NEW',
};

const createQuizPageSlice = createSlice({
	name: 'questionsPage',
	initialState,
	reducers: {
		setProfileId: (state, action: PayloadAction<string>) => {
			state.profileId = action.payload;
		},
		setSkills: (state, action: PayloadAction<number[]>) => {
			state.skills = action.payload;
		},
		setComplexity: (state, action: PayloadAction<number[]>) => {
			state.complexity = action.payload;
		},
		setLimit: (state, action: PayloadAction<number>) => {
			state.limit = action.payload;
		},
		setMode: (state, action: PayloadAction<QuestionModeType>) => {
			state.mode = action.payload;
		},
	},
});

export const { reducer: createQuizPageReducer, actions: createQuizPageActions } =
	createQuizPageSlice;
