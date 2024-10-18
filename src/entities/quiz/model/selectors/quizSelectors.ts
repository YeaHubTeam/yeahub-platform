import { State } from '@/shared/config/store/State';

export const getActiveQuizQuestions = (state: State) => {
	return state.activeQuiz.questions;
};

export const getIsAllQuestionsAnswered = (state: State) => {
	return state.activeQuiz.questions.every((question) => question.answer !== undefined);
};
