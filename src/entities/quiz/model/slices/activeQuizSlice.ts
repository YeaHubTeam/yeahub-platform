import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { manageLocalStorage } from '@/shared/helpers/manageLocalStorage';

import { ActiveQuizState, Answers, ChangeQuestionAnswerParams } from '../types/quiz';

const initialState: ActiveQuizState = {
	startDate: '',
	questions: [],
};

const { setStoredItem: setStartDateQuiz } = manageLocalStorage('startDateQuiz');
const { setStoredItem: setActiveQuiz } = manageLocalStorage('activeQuiz');

export const activeQuizSlice = createSlice({
	name: 'quiz',
	initialState,
	reducers: {
		setStartDate: (state, action: PayloadAction<string>) => {
			state.startDate = action.payload;
			setStartDateQuiz(action.payload);
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
			setActiveQuiz(JSON.stringify(state.questions));
		},
	},
});

export const { setStartDate, setActiveQuizQuestions, changeQuestionAnswer } =
	activeQuizSlice.actions;
