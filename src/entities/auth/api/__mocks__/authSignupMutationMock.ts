import { HttpResponse, http, PathParams } from 'msw';

import { authApiUrls } from '../../model/constants/authConstants';
import { SignUpBodyRequest, SignUpResponse } from '../../model/types/auth';

import { authMockResponse } from './data/authMockResponse';

export const authSignupMutationMock = () =>
	http.post<PathParams, SignUpBodyRequest, SignUpResponse>(
		process.env.API_URL + authApiUrls.register,
		() => {
			return HttpResponse.json(authMockResponse);
		},
	);
