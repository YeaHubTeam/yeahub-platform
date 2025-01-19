import { createSelector } from '@reduxjs/toolkit';

import { State } from '@/shared/config/store/State';

export const getActiveQuizQuestions = (state: State) => {
	return state.activeQuiz.questions;
};

export const getIsAllQuestionsAnswered = (state: State) => {
	return state.activeQuiz.questions.every((question) => question.answer !== undefined);
};

export const getLastActiveQuizInfo = createSelector(
	getActiveQuizQuestions,
	(activeQuizQuestions) => {
		if (!activeQuizQuestions || !activeQuizQuestions.length) return null;

		const questionWithoutAnswer =
			activeQuizQuestions.find((question) => !question.answer) ?? activeQuizQuestions[0];
		const questionIndexWithoutAnswer = activeQuizQuestions.findIndex(
			(question) => !question.answer,
		);
		return {
			question: questionWithoutAnswer,
			fromQuestionNumber: questionIndexWithoutAnswer >= 0 ? questionIndexWithoutAnswer + 1 : 1,
			toQuestionNumber: activeQuizQuestions.length,
		};
	},
);
