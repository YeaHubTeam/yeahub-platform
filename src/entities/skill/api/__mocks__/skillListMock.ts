import { DefaultBodyType, http, HttpResponse } from 'msw';

import { calculatePagination } from '@/shared/libs';

import { skillApiUrls } from '../../model/constants/skillConstants';
import { GetSkillsListParamsRequest, GetSkillsListResponse } from '../../model/types/skill';

import { skillsMock } from './data';

export const skillListMock = http.get<
	Record<keyof GetSkillsListParamsRequest, string>,
	DefaultBodyType,
	GetSkillsListResponse
>(process.env.API_URL + skillApiUrls.getSkillsList, ({ request }) => {
	const url = new URL(request.url);
	const page = Number(url.searchParams.get('page') ?? 1);
	const limit = Number(url.searchParams.get('limit') ?? 10);
	const specialization = url.searchParams.get('specializations');
	const authorId = url.searchParams.get('authorId');
	const title = url.searchParams.get('title');

	const data = skillsMock.filter((skill) => {
		const specializationMatch = specialization
			? specialization
					.split(',')
					.some((specialization) =>
						skill.specializations?.some(
							(skillSpecialization) => String(skillSpecialization.id) === specialization,
						),
					)
			: true;

		const authorMatch = authorId ? skill.createdBy.id === authorId : true;

		const titleMatch = title ? skill.title.toLowerCase().includes(title.toLowerCase()) : true;

		return specializationMatch && authorMatch && titleMatch;
	});

	const paginationData = calculatePagination(data, page, limit);

	return HttpResponse.json({
		data: paginationData,
		page,
		total: 10,
		limit: 50,
	});
});
