import { State } from '@/shared/config/store/State';

export const getActiveQuizQuestions = (state: State) => {
	return state.activeQuiz.questions;
};
