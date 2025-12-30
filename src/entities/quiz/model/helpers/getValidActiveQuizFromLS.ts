import { getJSONFromLS } from '@/shared/libs';

import { Answers } from '../types/quiz';

export const getValidActiveQuizFromLS = (key: string): Answers[] | null => {
	const activeQuizFromLS = getJSONFromLS(key);

	return Array.isArray(activeQuizFromLS) && activeQuizFromLS.length > 0 ? activeQuizFromLS : null;
};
