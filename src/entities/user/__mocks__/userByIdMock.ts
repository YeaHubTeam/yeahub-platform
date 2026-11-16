import { DefaultBodyType, http, HttpResponse } from 'msw';

import { userApiUrls } from '../model/constants/userConstants';
import { GetUserByIdResponse } from '../model/types/user';

import { usersDataMock } from './data/usersDataMock';

export const userByIdMock = http.get<Record<string, string>, DefaultBodyType, GetUserByIdResponse>(
	`${process.env.API_URL}${userApiUrls.getUserById}`,
	({ params }) => {
		const { userId } = params;
		const user = usersDataMock.data.find((u) => String(u.id) === userId);

		return HttpResponse.json(user);
	},
);
