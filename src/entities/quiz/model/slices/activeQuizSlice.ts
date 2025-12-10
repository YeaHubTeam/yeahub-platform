import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { clearStore } from '@/shared/config';
import { setToLS } from '@/shared/libs';

import { LS_ACTIVE_MOCK_QUIZ_KEY, LS_ACTIVE_QUIZZES_KEY } from '../constants/quizConstants';
import { getValidActiveMockQuizFromLS } from '../helpers/getValidActiveMockQuizFromLS';
import { getValidActiveQuizzesFromLS } from '../helpers/getValidActiveQuizzesFromLS';
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
			action: PayloadAction<{ questions: Answers[]; shouldSaveToLS?: boolean; profileId?: string }>,
		) => {
			const { questions, shouldSaveToLS = true, profileId } = action.payload;

			if (questions.length > 0) {
				if (shouldSaveToLS && profileId) {
					const { quizzes } = getValidActiveQuizzesFromLS();
					setToLS(LS_ACTIVE_QUIZZES_KEY, { ...(quizzes || {}), [profileId]: questions });
				}
				state.questions = questions;
			}
		},
		changeQuestionAnswer: (state, action: PayloadAction<ChangeQuestionAnswerParams>) => {
			const { shouldSaveToLS, profileId } = action.payload;
			state.questions = updateQuestionAnswer(state.questions, action.payload);
			if (shouldSaveToLS && profileId) {
				const { quizzes } = getValidActiveQuizzesFromLS();
				quizzes &&
					setToLS(LS_ACTIVE_QUIZZES_KEY, { ...(quizzes || {}), [profileId]: state.questions });
			}
		},
		changeMockQuestionAnswer: (state, action: PayloadAction<ChangeQuestionAnswerParams>) => {
			const { shouldSaveToLS, profileId } = action.payload;
			state.questions = updateQuestionAnswer(state.questions, action.payload);
			if (shouldSaveToLS && profileId) {
				const { quizzes } = getValidActiveMockQuizFromLS();
				quizzes &&
					setToLS(LS_ACTIVE_MOCK_QUIZ_KEY, { ...(quizzes || {}), [profileId]: state.questions });
			}
		},
		clearActiveQuizState: (state, action: PayloadAction<string>) => {
			state.questions = [];
			const { quizzes } = getValidActiveQuizzesFromLS();
			quizzes && delete quizzes[action.payload];
			setToLS(LS_ACTIVE_QUIZZES_KEY, { ...(quizzes || {}) });
		},
		clearActiveMockQuizState: (
			state,
			action: PayloadAction<{ shouldClearLS?: boolean; profileId?: string }>,
		) => {
			const { shouldClearLS = true, profileId } = action.payload;
			state.questions = [];
			if (shouldClearLS && profileId) {
				const { quizzes } = getValidActiveMockQuizFromLS();
				quizzes && delete quizzes[profileId];
				setToLS(LS_ACTIVE_MOCK_QUIZ_KEY, { ...(quizzes || {}) });
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(clearStore, () => {
			return initialState;
		});
	},
});

export const {
	setActiveQuizQuestions,
	changeQuestionAnswer,
	changeMockQuestionAnswer,
	clearActiveQuizState,
	clearActiveMockQuizState,
} = activeQuizSlice.actions;
