import { DefaultBodyType, http, HttpResponse } from 'msw';

import { userApiUrls } from '../model/constants/userConstants';
import { GetUserByIdResponse } from '../model/types/user';

export const userByIdMock = http.get<Record<string, string>, DefaultBodyType, GetUserByIdResponse>(
	`${process.env.API_URL}${userApiUrls.getUserById}`,
	({ params }) => {
		const { userId } = params;

		return HttpResponse.json({
			id: userId,
			username: 'Mock user',
			email: 'Mock@yeahub.ru',
			country: 'Russia',
			city: 'Moscow',
			address: 'Zemlyanoy Val Street, 72',
			avatarUrl: '',
			birthday: '1995-06-15',
			updatedAt: new Date().toISOString(),
			createdAt: '2023-01-10T08:00:00.000Z',
			userRoles: [
				{
					id: 1,
					name: 'guest',
					permissions: [],
				},
			],
			telegramUsername: 'mock_user_tg',
			isVerified: false,
		});
	},
);
