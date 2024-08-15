import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ActiveQuizzesState, Answers } from '../types/quiz';

const initialState: ActiveQuizzesState = {
	quizzes: [],
};

export const activeQuizzesSlice = createSlice({
	name: 'quiz',
	initialState,
	reducers: {
		setQuizzes: (state, action: PayloadAction<Answers[]>) => {
			state.quizzes = action.payload;
		},
	},
});

export const { setQuizzes } = activeQuizzesSlice.actions;
