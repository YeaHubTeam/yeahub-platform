import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { clearStore } from '@/shared/config/store/clearStore';
import { setToLS } from '@/shared/helpers/manageLocalStorage';

import { getValidActiveQuizzesFromLS } from '@/entities/quiz/model/helpers/getValidActiveQuizzesFromLS';

import { LS_ACTIVE_MOCK_QUIZ_KEY, LS_ACTIVE_QUIZZES_KEY } from '../constants/quizConstants';
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
			const { shouldSaveToLS, profileId, hasPremium = true } = action.payload;
			state.questions = updateQuestionAnswer(state.questions, action.payload);
			if (shouldSaveToLS && profileId) {
				if (hasPremium) {
					const { quizzes } = getValidActiveQuizzesFromLS();
					quizzes &&
						setToLS(LS_ACTIVE_QUIZZES_KEY, { ...(quizzes || {}), [profileId]: state.questions });
				} else {
					setToLS(LS_ACTIVE_MOCK_QUIZ_KEY, state.questions);
				}
			}
		},
		clearActiveQuizState: (state, action: PayloadAction<string>) => {
			state.questions = [];
			const { quizzes } = getValidActiveQuizzesFromLS();
			quizzes && delete quizzes[action.payload];
			quizzes && setToLS(LS_ACTIVE_QUIZZES_KEY, { ...(quizzes || {}) });
		},
	},
	extraReducers: (builder) => {
		builder.addCase(clearStore, () => {
			return initialState;
		});
	},
});

export const { setActiveQuizQuestions, changeQuestionAnswer, clearActiveQuizState } =
	activeQuizSlice.actions;
