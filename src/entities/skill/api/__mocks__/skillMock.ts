import { DefaultBodyType, http, HttpResponse } from 'msw';

import { skillApiUrls } from '../../model/constants/skillConstants';
import type { GetSkillByIdParamsRequest, GetSkillByIdResponse } from '../../model/types/skill';

import { skillsMock } from './data/index';

export const skillByIdMock = http.get<
	Record<keyof GetSkillByIdParamsRequest, string>,
	DefaultBodyType,
	GetSkillByIdResponse
>(`${process.env.API_URL}${skillApiUrls.getSkillById}:skillId`, ({ params }) => {
	const { skillId } = params;

	const skill = skillsMock.data.find((skill) => String(skill.id) === skillId);

	return HttpResponse.json(skill);
});
