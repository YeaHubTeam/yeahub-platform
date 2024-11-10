import { HttpResponse, http, PathParams, DefaultBodyType } from 'msw';

import { authApiUrls } from '../../model/constants/authConstants';
import { RefreshResponse } from '../../model/types/auth';

import { authMockResponse } from './data/authMockResponse';

export const authRefreshQueryMock = () =>
	http.get<PathParams, DefaultBodyType, RefreshResponse>(
		process.env.API_URL + authApiUrls.refresh,
		() => {
			return HttpResponse.json(authMockResponse);
		},
	);
