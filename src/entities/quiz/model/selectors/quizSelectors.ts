import { State } from '@/shared/config/store/State';
import { manageLocalStorage } from '@/shared/helpers/manageLocalStorage';

export const getActiveQuizQuestions = (state: State) => {
	const { getStoredItem } = manageLocalStorage('accessToken');
	const localActiveQuiz = getStoredItem();
	return localActiveQuiz && state.activeQuiz.questions;
};
export const getQuizStartDate = (state: State) => state.activeQuiz.startDate;
