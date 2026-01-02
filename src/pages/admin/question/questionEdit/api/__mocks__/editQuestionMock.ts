import { http, HttpResponse, PathParams } from 'msw';

import { questionsMock } from '@/entities/question';

import { editQuestionApiUrls } from '../../lib/constants/editQuestionConstants';
import {
	EditQuestionBodyRequest,
	EditQuestionResponse,
} from '../../model/types/questionEditPageTypes';

export const editQuestionMock = http.patch<
	PathParams,
	EditQuestionBodyRequest,
	EditQuestionResponse | { error: string }
>(process.env.API_URL + editQuestionApiUrls.editQuestion, async ({ request }) => {
	const formData = await request.json();

	const questionId = questionsMock.data.findIndex((question) => question.id === formData.id);

	if (questionId !== -1) {
		const updateQuestion = {
			...questionsMock.data[questionId],
			...formData,
			updatedAt: new Date().toISOString(),
		};

		questionsMock.data[questionId] = updateQuestion;

		return HttpResponse.json(updateQuestion);
	}

	return HttpResponse.json({ error: 'Question not found' }, { status: 404 });
});
