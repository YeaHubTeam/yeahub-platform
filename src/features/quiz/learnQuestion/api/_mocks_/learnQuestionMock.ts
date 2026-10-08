import { http, HttpResponse, PathParams } from 'msw';

import { userQuestionProgressMock } from '@/entities/question';

import { LearnQuestionParams, LearnQuestionResponse } from '../../model/types/learnQuestionTypes';

const apiUrl = process.env.API_URL;

export const learnQuestionMock = http.put<
	PathParams,
	LearnQuestionParams,
	LearnQuestionResponse | { error: string }
>(apiUrl + `interview-preparation`, async ({ request }) => {
	const formData = await request.json();
	const { isLearned, profileId, questionId } = formData;
	const question = userQuestionProgressMock[profileId][questionId];

	if (isLearned) {
		question.checksCount = 3;
		question.isLearned = true;
	} else {
		question.checksCount += 1;

		if (question.checksCount === 3) {
			question.isLearned = true;
		}
	}

	return HttpResponse.json(true);
});
