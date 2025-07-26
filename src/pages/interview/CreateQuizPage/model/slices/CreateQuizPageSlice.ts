import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { clearStore } from '@/shared/config/store/clearStore';

import { QuestionModeType } from '@/entities/quiz';

import { CreateQuizPageState } from '../types/CreateQuizPageTypes';

const initialState: CreateQuizPageState = {
	profileId: undefined,
	skills: undefined,
	complexity: undefined,
	limit: undefined,
	mode: undefined,
};

const createQuizPageSlice = createSlice({
	name: 'questionsPage',
	initialState,
	reducers: {
		setProfileId: (state, action: PayloadAction<string>) => {
			state.profileId = action.payload;
		},
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

export const { reducer: createQuizPageReducer, actions: createQuizPageActions } =
	createQuizPageSlice;
