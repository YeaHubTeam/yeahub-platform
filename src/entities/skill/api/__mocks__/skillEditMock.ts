import { http, HttpResponse } from 'msw';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { specializationsMock } from '@/entities/specialization';

import { skillApiUrls } from '../../model/constants/skillConstants';
import {
	EditSkillBodyRequest,
	EditSkillParamsRequest,
	EditSkillResponse,
	Skill,
} from '../../model/types/skill';

import { skillsMock } from './data';

export const skillEditMock = http.patch<
	EditSkillParamsRequest,
	EditSkillBodyRequest,
	EditSkillResponse
>(`${process.env.API_URL}${skillApiUrls.getSkillById}`, async ({ params, request }) => {
	const { skillId } = params;

	const body = await request.json();

	const indexSkill = skillsMock.data.findIndex(({ id }) => String(id) === skillId);

	if (indexSkill === -1) {
		return HttpResponse.json({ message: 'Skill not found' }, { status: 404 });
	}

	const specializations = body.specializations?.map(
		(id) =>
			specializationsMock.data.find((spec) => spec.id === id) || {
				id,
				title: 'Not found',
				description: 'Not found',
			},
	);

	const updSkill: Skill = { ...body, specializations };

	skillsMock.data[indexSkill] = updSkill;

	return HttpResponse.json(updSkill);
});
