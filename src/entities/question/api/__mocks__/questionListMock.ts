import { DefaultBodyType, http, HttpResponse } from 'msw';

import { questionApiUrls } from '../../model/constants/question';
import {
	GetQuestionsListResponse,
	GetQuestionsListParamsRequest,
} from '../../model/types/question';

import { questionsMock } from './data';

export const questionListMock = http.get<
	Record<keyof GetQuestionsListParamsRequest, string>,
	DefaultBodyType,
	GetQuestionsListResponse
>(process.env.API_URL + questionApiUrls.getQuestionsList, ({ request }) => {
	const url = new URL(request.url);
	const page = url.searchParams.get('page') ?? 1;
	const limit = url.searchParams.get('limit');
	const title = url.searchParams.get('title');
	const complexity = url.searchParams.get('complexity');
	const rate = url.searchParams.get('rate');
	const skills = url.searchParams.get('skills');
	const specialization = url.searchParams.get('specialization');

	const data = questionsMock.data.filter((question) => {
		const hasTitle = title ? question.title.toLowerCase().includes(title.toLowerCase()) : true;
		const hasComplexity = complexity
			? complexity.split(',').includes(String(question.complexity))
			: true;
		const hasRating = rate ? rate.split(',').includes(String(question.rate)) : true;

		const hasSpecialization = specialization
			? specialization
					.split(',')
					.some((spec) =>
						question.questionSpecializations.some(
							(questionSpec) => String(questionSpec.id) === spec,
						),
					)
			: true;

		const hasSkills = skills
			? skills
					.split(',')
					.some((skill) =>
						question.questionSkills.some((questionSkill) => String(questionSkill.id) === skill),
					)
			: true;

		return hasTitle && hasComplexity && hasRating && hasSpecialization && hasSkills;
	});

	const paginationDate = data.slice(
		(Number(page) - 1) * Number(limit),
		Number(page) * Number(limit),
	);

	return HttpResponse.json({
		data: paginationDate,
		page: Number(page),
		total: questionsMock.total,
		limit: questionsMock.limit,
	});
});
