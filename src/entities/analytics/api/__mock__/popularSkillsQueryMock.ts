import { http, HttpResponse, PathParams } from 'msw';

import { analyticsApiUrls } from '../../model/constants/analyticsConstants';
import { PopularSkillsResponse } from '../../model/types/analytics';

import { popularSkillsMockResponse } from './data/popularSkillsMockResponse';

export const popularSkillsQueryMock = () =>
	http.get<PathParams, never, PopularSkillsResponse>(
		process.env.API_URL + analyticsApiUrls.popularSkills,
		() => {
			return HttpResponse.json(popularSkillsMockResponse);
		},
	);
