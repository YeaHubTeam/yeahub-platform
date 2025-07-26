import { getJSONFromLS } from '@/shared/helpers/manageLocalStorage';

import { LS_ACTIVE_QUIZZES_KEY } from '../constants/quizConstants';
import { Answers } from '../types/quiz';

interface GetValidActiveQuizzesFromLS {
	quizzes: Record<string, Answers[]> | null;
	profileActiveQuiz: Answers[] | null;
}

export const getValidActiveQuizzesFromLS = (profileId?: string): GetValidActiveQuizzesFromLS => {
	const activeQuizzesFromLS = getJSONFromLS(LS_ACTIVE_QUIZZES_KEY);
	const quizzes: Record<string, Answers[]> =
		activeQuizzesFromLS && Object.keys(activeQuizzesFromLS).length > 0 ? activeQuizzesFromLS : null;
	const profileActiveQuiz = quizzes && profileId ? quizzes[profileId] : null;

	return {
		quizzes,
		profileActiveQuiz,
	};
};
