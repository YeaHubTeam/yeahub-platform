import { DefaultBodyType, http, HttpResponse } from 'msw';

import { learnedQuestionApiUrls } from '../../model/constants';
import { preparePaginatedData } from '../../model/lib';
import { LearnedQuestionsParamsRequest, LearnedQuestionsResponse } from '../../model/types';

import { learnedQuestionsMock } from './data';

export const getLearnedQuestionsMock = http.get<
	Record<keyof LearnedQuestionsParamsRequest, string>,
	DefaultBodyType,
	LearnedQuestionsResponse
>(process.env.API_URL + learnedQuestionApiUrls.getLearnedQuestions, ({ request }) => {
	const url = new URL(request.url);

	const page = url.searchParams.get('page') ?? '1';
	const limit = url.searchParams.get('limit') ?? '10';
	const specializationId = url.searchParams.get('specializationId');

	const paginatedData = specializationId
		? preparePaginatedData({
				questions: learnedQuestionsMock.data.filter(
					(question) => question.specialization.id === Number(specializationId),
				),
				page,
				limit,
			})
		: preparePaginatedData({ questions: learnedQuestionsMock.data, page, limit });

	return HttpResponse.json({
		page: Number(page),
		limit: Number(limit),
		data: paginatedData,
		total: learnedQuestionsMock.total,
	});
});
