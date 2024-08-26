import { State } from '@/shared/config/store/State';

export const getActiveQuizQuestions = (state: State) => {
	return state.activeQuiz.questions;
};
export const getQuizStartDate = (state: State) => state.activeQuiz.startDate;
