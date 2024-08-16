import { NewQuizResponse } from '../model/types/quiz';

export const getActiveQuizInfo = (data: NewQuizResponse) => {
	return {
		...data,
		startDate: new Date().toISOString(),
	};
};
