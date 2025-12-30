import { createSelector } from '@reduxjs/toolkit';

import { State } from '@/shared/config';

export const getActiveQuizQuestions = (state: State) => {
	return state.activeQuiz.questions;
};

export const getIsAllQuestionsAnswered = (state: State) => {
	return state.activeQuiz.questions.every((question) => question.answer !== undefined);
};

export const getLastActiveQuizInfo = createSelector(
	getActiveQuizQuestions,
	getIsAllQuestionsAnswered,
	(activeQuizQuestions, areAllQuestionsAnswered) => {
		const answeredCount = activeQuizQuestions.filter(
			(question) => question.answer !== undefined && question.answer !== null,
		).length;

		if (!activeQuizQuestions || !activeQuizQuestions.length) return null;
		if (areAllQuestionsAnswered) {
			return {
				question: activeQuizQuestions[0],
				fromQuestionNumber: activeQuizQuestions.length,
				toQuestionNumber: activeQuizQuestions.length,
			};
		}

		const questionWithoutAnswer =
			activeQuizQuestions.find((question) => !question.answer) ?? activeQuizQuestions[0];
		const questionIndexWithoutAnswer = activeQuizQuestions.findIndex(
			(question) => !question.answer,
		);
		return {
			question: questionWithoutAnswer,
			fromQuestionNumber: questionIndexWithoutAnswer >= 0 ? questionIndexWithoutAnswer + 1 : 1,
			toQuestionNumber: activeQuizQuestions.length,
			answeredCount: answeredCount,
		};
	},
);
