import { http, HttpResponse, PathParams } from 'msw';

import { skillApiUrls } from '../../model/constants/skillConstants';
import { PopularSkillsResponse } from '../../model/types/skill';

import { popularSkillsMock } from './data';

export const skillListPopularMock = http.get<
	PathParams,
	Pick<PopularSkillsResponse, 'limit' | 'page' | 'specializationId'>,
	PopularSkillsResponse
>(process.env.API_URL + skillApiUrls.popularSkills, async () => {
	return HttpResponse.json(popularSkillsMock);
});
