import { http, HttpResponse } from 'msw';

import { CreateOrEditSkillFormValues, Skill, skillsMock } from '@/entities/skill';
import { specializationsMock } from '@/entities/specialization';

import { createSkillApiUrls } from '../../model/constants/createSkillConstants';
import { CreateSkillResponse } from '../../model/types/skillCreateTypes';

export const skillCreateMock = http.post<
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
					description: 'Unknown',
				},
		),
	};

	skillsMock.data.push(newSkill);

	return HttpResponse.json(newSkill);
});
