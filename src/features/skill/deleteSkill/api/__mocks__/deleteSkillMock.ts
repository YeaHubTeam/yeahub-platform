import { http, HttpResponse } from 'msw';

import { authMockProfilesByAccessToken } from '@/entities/auth';
import { questionsMock } from '@/entities/question';
import { resourcesMock } from '@/entities/resource';
import { skillsMock } from '@/entities/skill';
import { topicsMocks } from '@/entities/topic';

import { deleteSkillApiUrls } from '../../model/constants/deleteSkillConstants';

export const deleteSkillMock = http.delete(
	process.env.API_URL + deleteSkillApiUrls.deleteSkill,
	({ params, request }) => {
		const skillId = String(params.skillId);

		const authorizationHeader = request.headers.get('Authorization') ?? '';
		const accessToken = authorizationHeader.replace(/^Bearer\s+/i, '');
		const profileMockResponse = authMockProfilesByAccessToken[accessToken];

		const currentSkill = skillsMock.data.find((skill) => String(skill.id) === skillId);

		//Пользователь авторизован
		if (!profileMockResponse) {
			return HttpResponse.json({
				message: 'auth.auth.unauthorized',
				statusCode: 401,
				description: 'Authentication failed',
			});
		}

		//Пользователь верифицирован
		if (!profileMockResponse.isVerified) {
			return HttpResponse.json({
				message: 'auth.user.verified',
				statusCode: 403,
				description: 'Route is available for verified users!',
			});
		}

		//Навык не найден
		if (!currentSkill) {
			return HttpResponse.json({
				message: 'skill.skill.not_found',
				statusCode: 404,
				description: 'Skill not found',
			});
		}

		//Навык привязан к какой то специализаци
		const hasSkillInSpec = currentSkill?.specializations && currentSkill.specializations.length > 0;
		if (hasSkillInSpec) {
			return HttpResponse.json({
				message: 'skill.specialization.constraint.foreign_key_violation',
				statusCode: 409,
				description: 'Cannot delete skill because it is referenced by some specialization',
			});
		}

		//Навык привязан к какому то вопросу
		const hasSkillInQuestion = questionsMock.data.some(({ questionSkills }) =>
			questionSkills.some((skill) => String(skill.id) === skillId),
		);
		if (hasSkillInQuestion) {
			return HttpResponse.json({
				message: 'skill.question.constraint.foreign_key_violation',
				statusCode: 409,
				description: 'Cannot delete skill because it is referenced by some question',
			});
		}
		//Навык указан в каком то профиле
		const hasSkillInProfile = Object.values(authMockProfilesByAccessToken).some((user) =>
			user.profiles.some((profile) =>
				profile.profileSkills.some((skill) => String(skill.id) === skillId),
			),
		);

		if (hasSkillInProfile) {
			return HttpResponse.json({
				message: 'skill.profile.constraint.foreign_key_violation',
				statusCode: 409,
				description: 'Cannot delete skill because it is referenced by some profile',
			});
		}

		//Навык привязан к какой то другой сущности не относящихся к 4-6 пунктам - ресурсы и темы
		const hasSkillInResource = resourcesMock.data.some(({ skills }) =>
			skills.some((skill) => String(skill.id) === skillId),
		);
		const hasSkillInTopic = topicsMocks.data.some((topic) => String(topic.skill?.id) === skillId);

		if (hasSkillInResource || hasSkillInTopic) {
			return HttpResponse.json({
				message: 'skill.skill.constraint.foreign_key_violation',
				statusCode: 409,
				description: 'Cannot delete skill because it is referenced by other entities',
			});
		}
		return new HttpResponse(null, { status: 200 });
	},
);
