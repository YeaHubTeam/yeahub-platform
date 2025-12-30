import { getJSONFromLS } from '@/shared/libs';

import { LS_ACTIVE_MOCK_QUIZ_KEY } from '../constants/quizConstants';
import { Answers } from '../types/quiz';

interface GetValidActiveQuizzesFromLS {
	quizzes: Record<string, Answers[]> | null;
	profileActiveQuiz: Answers[] | null;
}

export const getValidActiveMockQuizFromLS = (profileId?: string): GetValidActiveQuizzesFromLS => {
	const activeQuizzesFromLS = getJSONFromLS(LS_ACTIVE_MOCK_QUIZ_KEY);
	const quizzes: Record<string, Answers[]> =
		activeQuizzesFromLS && Object.keys(activeQuizzesFromLS).length > 0 ? activeQuizzesFromLS : null;
	const profileActiveQuiz = quizzes && profileId ? quizzes[profileId] : null;

	return {
		quizzes,
		profileActiveQuiz,
	};
};
