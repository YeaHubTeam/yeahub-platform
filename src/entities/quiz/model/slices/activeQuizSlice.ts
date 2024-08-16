import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
	ActiveQuizState,
	ActiveQuizWithDate,
	Answers,
	ChangeQuestionAnswerParams,
} from '../types/quiz';

const initialState: ActiveQuizState = {
	quiz: {
		id: '',
		profileId: '',
		startDate: '',
		fullCount: 0,
		skills: [],
		response: {
			answers: [],
		},
		questions: [],
	},
	questions: [],
};

export const activeQuizSlice = createSlice({
	name: 'quiz',
	initialState,
	reducers: {
		setActiveQuiz: (state, action: PayloadAction<ActiveQuizWithDate>) => {
			state.quiz = action.payload;
		},
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
		},
	},
});

export const { setActiveQuiz, setActiveQuizQuestions, changeQuestionAnswer } =
	activeQuizSlice.actions;
