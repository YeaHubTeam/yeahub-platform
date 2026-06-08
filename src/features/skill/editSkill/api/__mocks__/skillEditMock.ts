import { http, HttpResponse, PathParams } from 'msw';

import { skillsMock, Skill } from '@/entities/skill';
import { specializationsMock } from '@/entities/specialization';

import { editSkillApiUrls } from '../../model/constants/editSkillConstants';
import { EditSkillBodyRequest, EditSkillResponse } from '../../model/types/skillEditPageTypes';

export const skillEditMock = http.patch<PathParams, EditSkillBodyRequest, EditSkillResponse>(
	`${process.env.API_URL}${editSkillApiUrls.editSkill}`,
	async ({ params, request }) => {
		const { skillId } = params;

		const body = await request.json();

		const indexSkill = skillsMock.data.findIndex(({ id }) => String(id) === skillId);

		const specializations = body.specializations?.map((id) => {
			const index = specializationsMock.findIndex((spec) => spec.id === id);

			return specializationsMock[index];
		});

		const updSkill: Skill = { ...body, specializations };

		skillsMock.data[indexSkill] = updSkill;

		return HttpResponse.json(updSkill);
	},
);
