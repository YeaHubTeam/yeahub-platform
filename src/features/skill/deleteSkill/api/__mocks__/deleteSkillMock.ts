import { http } from 'msw';

import { skillsMock } from '@/entities/skill';

import { deleteSkillApiUrls } from '../../model/constants/deleteSkillConstants';

export const deleteSkillMock = http.delete(
	process.env.API_URL + deleteSkillApiUrls.deleteSkill,
	({ params }) => {
		const skillId = String(params.skillId);

		const index = skillsMock.data.findIndex((skill) => String(skill.id) === skillId);

		if (index !== 1) {
			skillsMock.data.splice(index, 1);
		}

		return new Response();
	},
);
