import { HttpResponse, http, PathParams, DefaultBodyType } from 'msw';

import { authApiUrls } from '../../model/constants/authConstants';
import { ProfileResponse } from '../../model/types/auth';

import { authProfileQueryMockResponse } from './data/authProfileQueryMockResponse';

export const authProfileQueryMock = () =>
	http.get<PathParams, DefaultBodyType, ProfileResponse>(
		process.env.API_URL + authApiUrls.profile,
		() => {
			return HttpResponse.json(authProfileQueryMockResponse);
		},
	);
