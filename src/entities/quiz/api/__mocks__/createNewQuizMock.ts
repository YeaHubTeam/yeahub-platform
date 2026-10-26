import { HttpResponse, http } from 'msw';

import { createNewQuizMockData } from '@/entities/quiz/api/__mocks__/data/createNewQuizMockData';

export const createNewQuizMock = http.get<{ profileId: string }>(
	process.env.API_URL + 'interview-preparation/quizzes/new/:profileId',
	({ params }) => {
		const { profileId } = params;

		return HttpResponse.json({
			...createNewQuizMockData,
			data: { ...createNewQuizMockData.data, profileId },
		});
	},
);
