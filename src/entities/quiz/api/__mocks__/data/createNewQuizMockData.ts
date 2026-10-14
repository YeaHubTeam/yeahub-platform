import { Response } from '@/shared/libs';

import { CreateNewQuizResponse } from '@/entities/quiz/model/types/quiz';

export const createNewQuizMockData: Response<CreateNewQuizResponse> = {
	data: {
		id: '1',
		profileId: '1',
		quizNumber: 1,
		startDate: '2026-10-13T10:00:00.000Z',
		fullCount: 0,
		successCount: 0,
		skills: [],
		response: {
			answers: [],
		},
		questions: [],
	},
	limit: 10,
	total: 1,
	page: 1,
};
