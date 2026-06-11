import { HttpResponse, http, PathParams, DefaultBodyType } from 'msw';

import { authApiUrls } from '../../model/constants/authConstants';
import { ProfileResponse } from '../../model/types/auth';

import { authMockProfilesByAccessToken } from './data/authMockResponse';

export const authProfileQueryMock = () =>
	http.get<PathParams, DefaultBodyType, ProfileResponse>(
		process.env.API_URL + authApiUrls.profile,
		({ request }) => {
			const authorizationHeader = request.headers.get('Authorization') ?? '';
			const accessToken = authorizationHeader.replace(/^Bearer\s+/i, '');
			const profileMockResponse = authMockProfilesByAccessToken[accessToken];

			if (!profileMockResponse) {
				return HttpResponse.json(
					{ message: 'auth.auth.unauthorized' } as unknown as ProfileResponse,
					{ status: 401 },
				);
			}

			return HttpResponse.json(profileMockResponse);
		},
	);
