import { http, HttpResponse, PathParams } from 'msw';

import { LearnQuestionParams, LearnQuestionResponse } from '../../model/types/learnQuestionTypes';

export const learnQuestionMock = http.put<
	PathParams,
	LearnQuestionParams,
	LearnQuestionResponse | { error: string }
>(process.env.API_URL + `/interview-preparation`, async ({ request }) => {
	const formData = await request.json();

	if (!('profileId' in formData)) {
		return HttpResponse.json({ error: 'Profile ID is required' }, { status: 400 });
	}

	if (!('questionId' in formData)) {
		return HttpResponse.json({ error: 'Question ID is required' }, { status: 400 });
	}

	return HttpResponse.json(true);
});
