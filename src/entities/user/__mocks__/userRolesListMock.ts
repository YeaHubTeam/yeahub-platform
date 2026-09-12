import { DefaultBodyType, http, HttpResponse } from 'msw';

import { userApiUrls } from '../model/constants/userConstants';
import { GetUserRolesListResponse } from '../model/types/user';

import { userRolesMock } from './data/userRolesMock';

export const userRolesListMock = http.get<
	Record<string, string>,
	DefaultBodyType,
	GetUserRolesListResponse
>(`${process.env.API_URL}${userApiUrls.getUserRolesList}`, () => {
	return HttpResponse.json(userRolesMock);
});
