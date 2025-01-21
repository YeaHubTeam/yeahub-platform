import { DefaultBodyType, http, HttpResponse } from 'msw';

import { questionApiUrls } from '../../model/constants/question';
import { GetQuestionByIdParamsRequest, GetQuestionByIdResponse } from '../../model/types/question';

import { questionsMock } from './data/index';

export const questionByIdMock = http.get<
	Record<keyof GetQuestionByIdParamsRequest, string>,
	DefaultBodyType,
	GetQuestionByIdResponse
>(`${process.env.API_URL}${questionApiUrls.getQuestionsList}/:questionId`, ({ params }) => {
	const { questionId, profileId } = params;

	const question = questionsMock.data.find((q) => String(q.id) === questionId);

	if (!profileId && question) {
		const { isLearned, checksCount, ...filteredQuestion } = question;
		return HttpResponse.json(filteredQuestion);
	}

	return HttpResponse.json(question);
});
