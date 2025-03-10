import { DefaultBodyType, http, HttpResponse } from 'msw';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { specializationsMock } from '@/entities/specialization';

import { createSkillApiUrls } from '@/features/skill/createSkill/model/constants/createSkillConstants';
import { CreateSkillResponse } from '@/features/skill/createSkill/model/types/skillCreateTypes';

import { skillApiUrls } from '../../model/constants/skillConstants';
import type {
	GetSkillByIdParamsRequest,
	GetSkillByIdResponse,
	CreateOrEditSkillFormValues,
	Skill,
} from '../../model/types/skill';

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

export const createSkillMock = http.post<
	Record<string, never>,
	CreateOrEditSkillFormValues,
	CreateSkillResponse
>(`${process.env.API_URL}${createSkillApiUrls.createSkill}`, async ({ request }) => {
	const body = await request.json();

	const newSkill: Skill = {
		id: Date.now(),
		title: body.title,
		description: body.description,
		imageSrc: body.imageSrc,
		specializations: body.specializations?.map(
			(id) =>
				specializationsMock.data.find((spec) => spec.id === id) || {
					id,
					title: 'Unknown',
					description: 'No',
				},
		),
	};

	skillsMock.data.push(newSkill);

	return HttpResponse.json(newSkill);
});
