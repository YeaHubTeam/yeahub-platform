import { http, HttpResponse, PathParams } from 'msw';

import { authApiUrls } from '../../model/constants/authConstants';
import { LoginBodyRequest, LoginResponse } from '../../model/types/auth';

import { authMockResponse } from './data';

export const authLoginMutationMock = () =>
	http.post<PathParams, LoginBodyRequest, LoginResponse>(
		process.env.API_URL + authApiUrls.login,
		() => {
			return HttpResponse.json(authMockResponse);
		},
	);
