import { getJSONFromLS } from '@/shared/helpers/manageLocalStorage';

import { Answers } from '@/entities/quiz';

export const getValidActiveQuizFromLS = (key: string): Answers[] | null => {
	const activeQuizFromLS = getJSONFromLS(key);

	return Array.isArray(activeQuizFromLS) && activeQuizFromLS.length > 0 ? activeQuizFromLS : null;
};
