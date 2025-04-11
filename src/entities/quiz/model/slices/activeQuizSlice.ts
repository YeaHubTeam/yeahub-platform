import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { removeFromLS, setToLS } from '@/shared/helpers/manageLocalStorage';

import { LS_ACTIVE_QUIZ_KEY } from '../constants/quizConstants';
import { updateQuestionAnswer } from '../helpers/updateQuestionAnswer';
import { ActiveQuizState, Answers, ChangeQuestionAnswerParams } from '../types/quiz';

const initialState: ActiveQuizState = {
	questions: [],
};

export const activeQuizSlice = createSlice({
	name: 'quiz',
	initialState,
	reducers: {
		setActiveQuizQuestions: (
			state,
			action: PayloadAction<{ questions: Answers[]; shouldSaveToLS?: boolean }>,
		) => {
			const { questions, shouldSaveToLS = true } = action.payload;

			if (questions.length > 0) {
				shouldSaveToLS && setToLS(LS_ACTIVE_QUIZ_KEY, questions);
				state.questions = questions;
			}
		},
		changeQuestionAnswer: (state, action: PayloadAction<ChangeQuestionAnswerParams>) => {
			const { shouldSaveToLS } = action.payload;
			state.questions = updateQuestionAnswer(state.questions, action.payload);
			shouldSaveToLS && setToLS(LS_ACTIVE_QUIZ_KEY, state.questions);
		},
		clearActiveQuizState: (state) => {
			state.questions = [];
			removeFromLS(LS_ACTIVE_QUIZ_KEY);
		},
	},
});

export const { setActiveQuizQuestions, changeQuestionAnswer, clearActiveQuizState } =
	activeQuizSlice.actions;
