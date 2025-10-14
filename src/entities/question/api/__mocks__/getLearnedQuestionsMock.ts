import { DefaultBodyType, http, HttpResponse } from 'msw';

import { questionApiUrls } from '../../model/constants/question';
import { preparePaginatedData } from '../../model/lib/getPaginatedData';
import {
	GetLearnedQuestionsParamsRequest,
	GetLearnedQuestionsResponse,
} from '../../model/types/learnedQuestion';
import { learnedQuestionsMock } from '../__mocks__/data';

export const getLearnedQuestionsMock = http.get<
	Record<keyof GetLearnedQuestionsParamsRequest, string>,
	DefaultBodyType,
	GetLearnedQuestionsResponse
>(process.env.API_URL + questionApiUrls.getLearnedQuestions, ({ request }) => {
	const url = new URL(request.url);

	const page = url.searchParams.get('page') ?? '1';
	const limit = url.searchParams.get('limit') ?? '10';
	const specializationId = url.searchParams.get('specializationId');
	const skillId = url.searchParams.get('skillId');

	const questions = learnedQuestionsMock.data.filter((question) => {
		const bySpecialization = specializationId
			? question.specialization.id === Number(specializationId)
			: true;

		const bySkill = skillId ? question.skill.id === Number(skillId) : true;

		return bySpecialization && bySkill;
	});

	const paginatedData = preparePaginatedData({
		questions,
		page,
		limit,
	});

	return HttpResponse.json({
		page: Number(page),
		limit: Number(limit),
		data: paginatedData,
		total: learnedQuestionsMock.total,
	});
});
