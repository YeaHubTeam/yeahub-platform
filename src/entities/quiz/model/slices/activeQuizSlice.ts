import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { removeFromLS, setToLS } from '@/shared/helpers/manageLocalStorage';

import { LS_ACTIVE_QUIZ_KEY } from '../constants/quizConstants';
import { ActiveQuizState, Answers, ChangeQuestionAnswerParams } from '../types/quiz';

const initialState: ActiveQuizState = {
	questions: [],
};

export const activeQuizSlice = createSlice({
	name: 'quiz',
	initialState,
	reducers: {
		setActiveQuizQuestions: (state, action: PayloadAction<Answers[]>) => {
			state.questions = action.payload;
		},
		changeQuestionAnswer: (state, action: PayloadAction<ChangeQuestionAnswerParams>) => {
			state.questions = state.questions.map((question) => {
				if (question.questionId === action.payload.questionId) {
					return { ...question, answer: action.payload.answer };
				}
				return question;
			});

			setToLS(LS_ACTIVE_QUIZ_KEY, state.questions);
		},
		clearActiveQuizState: (state) => {
			state.questions = [];
			removeFromLS(LS_ACTIVE_QUIZ_KEY);
		},
	},
});

export const { setActiveQuizQuestions, changeQuestionAnswer, clearActiveQuizState } =
	activeQuizSlice.actions;
