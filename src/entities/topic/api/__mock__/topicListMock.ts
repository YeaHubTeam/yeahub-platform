import { DefaultBodyType, http, HttpResponse } from 'msw';

import { topicApiUrl } from '@/entities/topic/model/constants/topicConstants';
import {
	GetTopicsListParamsRequest,
	GetTopicsListResponse,
} from '@/entities/topic/model/types/topic';

import { topicsMocks } from './data';

export const topicListMock = http.get<
	Record<keyof GetTopicsListParamsRequest, string>,
	DefaultBodyType,
	GetTopicsListResponse
>(process.env.API_URL + topicApiUrl.getTopicsList, ({ request }) => {
	const url = new URL(request.url);
	const page = Number(url.searchParams.get('page') ?? 1);
	const limit = Number(url.searchParams.get('limit') ?? 10);
	const skillIds = url.searchParams.get('skillIds');
	const title = url.searchParams.get('title');

	const filteredData = topicsMocks.data.filter((topic) => {
		const bySkill = skillIds
			? skillIds.split(',').some((id) => String(topic.skill.id) === id)
			: true;

		const byTitle = title ? topic.title.toLowerCase().includes(title.toLowerCase()) : true;

		return bySkill && byTitle;
	});

	const paginationData = filteredData.slice((page - 1) * limit, page * limit);

	return HttpResponse.json({
		data: paginationData,
		page,
		total: filteredData.length,
		limit,
	});
});
