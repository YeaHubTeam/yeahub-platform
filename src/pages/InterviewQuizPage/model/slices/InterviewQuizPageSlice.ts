import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { InterviewQuizPageState } from '../types/InterviewQuizPageTypes';

const initialState: InterviewQuizPageState = {
	profileId: undefined,
	limit: 10,
	page: 1,
};

const interviewQuizPageSlice = createSlice({
	name: 'interviewQuizPage',
	initialState,
	reducers: {
		setProfileId: (state, action: PayloadAction<string>) => {
			state.profileId = action.payload;
		},
		setLimit: (state, action: PayloadAction<number>) => {
			state.limit = action.payload;
		},
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
	},
});

export const { reducer: interviewQuizPageReducer, actions: interviewQuizPageActions } =
	interviewQuizPageSlice;
