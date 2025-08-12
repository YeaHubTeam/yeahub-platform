import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { clearStore } from '@/shared/config/store/clearStore';

import { QuestionModeType } from '@/entities/quiz';

import { CreatePublicQuizPageState } from '../types/CreatePublicQuizPageTypes';

const initialState: CreatePublicQuizPageState = {
	skills: undefined,
	complexity: undefined,
	limit: undefined,
	mode: undefined,
};

const createPublicQuizPageSlice = createSlice({
	name: 'createPublicQuizPage',
	initialState,
	reducers: {
		setSkills: (state, action: PayloadAction<number[] | undefined>) => {
			state.skills = action.payload;
		},
		setComplexity: (state, action: PayloadAction<number[] | undefined>) => {
			state.complexity = action.payload;
		},
		setLimit: (state, action: PayloadAction<number>) => {
			state.limit = action.payload;
		},
		setMode: (state, action: PayloadAction<QuestionModeType>) => {
			state.mode = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(clearStore, () => {
			return initialState;
		});
	},
});

export const { reducer: createPublicQuizPageReducer, actions: createPublicQuizPageActions } =
	createPublicQuizPageSlice;
