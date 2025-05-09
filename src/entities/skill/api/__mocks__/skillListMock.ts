import { DefaultBodyType, http, HttpResponse } from 'msw';

import { skillApiUrls } from '../../model/constants/skillConstants';
import { GetSkillsListParamsRequest, GetSkillsListResponse } from '../../model/types/skill';

import { skillsMock } from './data';

export const skillListMock = http.get<
	Record<keyof GetSkillsListParamsRequest, string>,
	DefaultBodyType,
	GetSkillsListResponse
>(process.env.API_URL + skillApiUrls.getSkillsList, ({ request }) => {
	const url = new URL(request.url);
	const page = url.searchParams.get('page') ?? 1;
	const limit = url.searchParams.get('limit');

	const data = skillsMock.data;

	const paginationData = data.slice(
		(Number(page) - 1) * Number(limit),
		Number(page) * Number(limit),
	);

	return HttpResponse.json({
		data: paginationData,
		page: Number(page),
		total: skillsMock.total,
		limit: skillsMock.limit,
	});
});
