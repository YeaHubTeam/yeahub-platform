import { HttpResponse, http, PathParams, DefaultBodyType } from 'msw';

import { authApiUrls } from '../../model/constants/authConstants';
import { ProfileResponse } from '../../model/types/auth';

import { getMockAuthProfile } from './helpers/getMockAuthProfile';

export const authProfileQueryMock = () =>
	http.get<PathParams, DefaultBodyType, ProfileResponse>(
		process.env.API_URL + authApiUrls.profile,
		({ request }) => {
			const profileMockResponse = getMockAuthProfile(request);

			if (!profileMockResponse) {
				return HttpResponse.json(
					{ message: 'auth.auth.unauthorized' } as unknown as ProfileResponse,
					{ status: 401 },
				);
			}

			return HttpResponse.json(profileMockResponse);
		},
	);
