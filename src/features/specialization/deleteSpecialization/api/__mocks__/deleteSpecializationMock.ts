import { http, HttpResponse } from 'msw';

import { authMockProfilesByAccessToken } from '@/entities/auth';
import { collectionsMock } from '@/entities/collection';
import { questionsMock } from '@/entities/question';
import { resourcesMock } from '@/entities/resource';
import { skillsMock } from '@/entities/skill';
import { specializationsMock } from '@/entities/specialization';

import { deleteSpecializationApiUrls } from '../../model/constants/deleteSpecializationConstants';

export const deleteSpecializationMock = http.delete(
	process.env.API_URL + deleteSpecializationApiUrls.deleteSpecialization,
	async ({ params, request }) => {
		const specializationId = Number(params.specializationId);

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

		const index = specializationsMock.findIndex(
			(specialization) => specialization.id === specializationId,
		);

		if (index === -1) {
			return HttpResponse.json(
				{
					message: 'specialization.specialization.not_found',
					statusCode: 404,
					description: 'Specialization not found',
				},
				{ status: 404 },
			);
		}

		const hasQuestionWithSpec = questionsMock.data.some(({ questionSpecializations }) =>
			questionSpecializations.some((spec) => spec.id === specializationId),
		);
		if (hasQuestionWithSpec) {
			return HttpResponse.json(
				{
					message: 'specialization.question.constraint.foreign_key_violation',
					statusCode: 409,
					description: 'Cannot delete specialization because it is referenced by some question',
				},
				{ status: 409 },
			);
		}

		const hasCollectionWithSpec = collectionsMock.data.some(({ specializations }) =>
			specializations.some((spec) => spec.id === specializationId),
		);

		if (hasCollectionWithSpec) {
			return HttpResponse.json(
				{
					message: 'specialization.collection.constraint.foreign_key_violation',
					statusCode: 409,
					description: 'Cannot delete specialization because it is referenced by some collection',
				},
				{ status: 409 },
			);
		}

		const hasResourceWithSpec = resourcesMock.data.some(({ specializations }) =>
			specializations.some((spec) => spec.id === specializationId),
		);
		const hasSkillWithSpec = skillsMock.data.some(({ specializations }) =>
			specializations?.some((spec) => spec.id === specializationId),
		);

		if (hasResourceWithSpec || hasSkillWithSpec) {
			return HttpResponse.json(
				{
					message: 'specialization.specialization.constraint.foreign_key_violation',
					statusCode: 409,
					description: 'Cannot delete specialization because it is referenced by other entities',
				},
				{ status: 409 },
			);
		}
		specializationsMock.splice(index, 1);

		return new HttpResponse(null, { status: 200 });
	},
);
