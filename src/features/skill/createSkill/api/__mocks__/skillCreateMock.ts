import { http, HttpResponse } from 'msw';

import { authMockProfilesByAccessToken } from '@/entities/auth';
import { CreateOrEditSkillFormValues, Skill, skillsMock } from '@/entities/skill';
import { specializationsMock } from '@/entities/specialization';

import { createSkillApiUrls } from '../../model/constants/createSkillConstants';
import { CreateSkillResponse } from '../../model/types/skillCreateTypes';

export const skillCreateMock = http.post<
	Record<string, never>,
	CreateOrEditSkillFormValues,
	CreateSkillResponse | { message: string; statusCode: number; description: string }
>(`${process.env.API_URL}${createSkillApiUrls.createSkill}`, async ({ request }) => {
	const authorizationHeader = request.headers.get('Authorization') ?? '';
	const accessToken = authorizationHeader.replace(/^Bearer\s+/i, '');
	const profileMockResponse = authMockProfilesByAccessToken[accessToken];

	if (!profileMockResponse) {
		return HttpResponse.json(
			{
				message: 'auth.auth.unauthorized',
				statusCode: 401,
				description: 'Authentication failed',
			},
			{ status: 401 },
		);
	}

	if (!profileMockResponse.isVerified) {
		return HttpResponse.json(
			{
				message: 'auth.user.verified',
				statusCode: 403,
				description: 'Route is available for verified users!',
			},
			{ status: 403 },
		);
	}

	const body = await request.json();

	const isTitleExists = skillsMock.data.some((skill) => skill.title === body.title);

	if (isTitleExists) {
		return HttpResponse.json(
			{
				message: 'skill.skill.title.conflict',
				statusCode: 409,
				description: 'A skill with the same title already exists',
			},
			{ status: 409 },
		);
	}

	const newSkill: Skill = {
		id: Date.now(),
		title: body.title,
		description: body.description,
		imageSrc: body.imageSrc,
		specializations: body.specializations?.map((id) => {
			const index = specializationsMock.findIndex((spec) => spec.id === id);

			return specializationsMock[index];
		}),
	};

	skillsMock.data.push(newSkill);

	return HttpResponse.json(newSkill, { status: 201 });
});
