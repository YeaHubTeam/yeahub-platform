import { DefaultBodyType, http, HttpResponse } from 'msw';

import { getMockAuthProfile } from '@/entities/auth';
import { collectionsMock } from '@/entities/collection';

import { deleteCollectionApiUrls } from '../../model/constants/deleteCollectionConstants';
import { DeleteCollectionError } from '../../model/types/deleteCollectionTypes';
export const deleteCollectionMock = http.delete<
	{ collectionId: string },
	DefaultBodyType,
	ApiErrorData<DeleteCollectionError>
>(process.env.API_URL + deleteCollectionApiUrls.deleteCollection, ({ params, request }) => {
	const collectionId = Number(params.collectionId);

	const profileMockResponse = getMockAuthProfile(request);

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

	const userRoles = profileMockResponse.userRoles?.map((role) => role.name) || [];
	if (!userRoles.includes('admin') && !userRoles.includes('author')) {
		return HttpResponse.json(
			{
				message: 'auth.roles.author_can_change_only_own',
				statusCode: 403,
				description: 'Author can change only own data',
			},
			{ status: 403 },
		);
	}

	const collectionIndex = collectionsMock.data.findIndex((c) => c.id === collectionId);
	if (collectionIndex === -1) {
		return HttpResponse.json(
			{
				message: 'collection.collection.not_found',
				statusCode: 404,
				description: 'Collection not found',
			},
			{ status: 404 },
		);
	}

	collectionsMock.data.splice(collectionIndex, 1);
	collectionsMock.total -= 1;

	return new HttpResponse(null, { status: 200 });
});
