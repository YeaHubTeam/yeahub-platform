import { DefaultBodyType, http, HttpResponse } from 'msw';

import { skillsMock } from '@/entities/skill';

import { deleteSkillApiUrls } from '../../model/constants/deleteSkillConstants';

export const deleteSkillMock = http.delete<
	{ skillId: string },
	DefaultBodyType,
	{ success: boolean } | { message: string }
>(`${process.env.API_URL}${deleteSkillApiUrls.deleteSkill}/:skillId`, ({ params }) => {
	const skillId = String(params.skillId);
	const skillIndex = skillsMock.data.findIndex((skill) => String(skill.id) === skillId);

	if (skillIndex === -1) {
		return HttpResponse.json({ message: 'Навык не найден' }, { status: 404 });
	}

	skillsMock.data.splice(skillIndex, 1);

	return HttpResponse.json({ success: true });
});
