import { http, HttpResponse, PathParams } from 'msw';

import { authApiUrls } from '../../model/constants/authConstants';
import { LoginBodyRequest, LoginResponse } from '../../model/types/auth';

import { authMockPasswordsByEmail, authMockResponsesByEmail } from './data/authMockResponse';

export const authLoginMutationMock = () =>
	http.post<PathParams, LoginBodyRequest, LoginResponse>(
		process.env.API_URL + authApiUrls.login,
		async ({ request }) => {
			const { username, password } = await request.json();
			const authMockResponse = authMockResponsesByEmail[username];
			const authMockPassword = authMockPasswordsByEmail[username];

			if (!authMockResponse || password !== authMockPassword) {
				return HttpResponse.json(
					{ message: 'auth.auth.unauthorized' } as unknown as LoginResponse,
					{ status: 401 },
				);
			}

			return HttpResponse.json(authMockResponse);
		},
	);
