import { DefaultBodyType, http, HttpResponse } from 'msw';

import { authMockProfilesByAccessToken, getMockAuthProfile } from '@/entities/auth';
import { questionsMock } from '@/entities/question';
import { resourcesMock } from '@/entities/resource';
import { skillsMock } from '@/entities/skill';
import { topicsMocks } from '@/entities/topic';

import { deleteSkillApiUrls } from '../../model/constants/deleteSkillConstants';
import { DeleteSkillError } from '../../model/types/DeleteSkillErrorTypes';

export const deleteSkillMock = http.delete<
	{ skillId: string },
	DefaultBodyType,
	ApiErrorData<DeleteSkillError>
>(process.env.API_URL + deleteSkillApiUrls.deleteSkill, ({ params, request }) => {
	const skillId = String(params.skillId);

	const profileMockResponse = getMockAuthProfile(request);

	const currentSkill = skillsMock.find((skill) => String(skill.id) === skillId);

	if (!profileMockResponse) {
		return HttpResponse.json({
			message: 'auth.auth.unauthorized',
			statusCode: 401,
			description: 'Authentication failed',
		});
	}

	if (!profileMockResponse.isVerified) {
		return HttpResponse.json({
			message: 'auth.user.verified',
			statusCode: 403,
			description: 'Route is available for verified users!',
		});
	}

	if (!currentSkill) {
		return HttpResponse.json({
			message: 'skill.skill.not_found',
			statusCode: 404,
			description: 'Skill not found',
		});
	}

	const hasSkillInSpec = currentSkill?.specializations && currentSkill.specializations.length > 0;
	if (hasSkillInSpec) {
		return HttpResponse.json({
			message: 'skill.specialization.constraint.foreign_key_violation',
			statusCode: 409,
			description: 'Cannot delete skill because it is referenced by some specialization',
		});
	}

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
});
