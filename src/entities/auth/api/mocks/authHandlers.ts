import { HttpResponse, http } from 'msw';

export const authHandlers = [
	http.get(process.env.API_URL + 'auth/profile', () => {
		return HttpResponse.json({
			id: 'mockuserid',
			firstName: 'mock',
			lastName: 'mock',
			phone: '+mock',
			country: 'mock',
			city: 'mock',
			email: 'mock@example.com',
			birthday: '1990-01-01T00:00:00.000Z',
			address: 'улица mock дом mock',
			avatarUrl: 'https://cdn.fastcup.net/logos/teams/20989_7n1la213o.png',
			createdAt: '2024-05-19T13:38:35.481Z',
			updatedAt: '2024-09-01T03:49:12.843Z',
			refreshToken: 'mockrefreshtoken',
			userRoles: [],
			profiles: [
				{
					profileId: 'mockprofileid1',
					specializationId: 1,
				},
			],
		});
	}),
	http.get(process.env.API_URL + 'auth/login', () => {
		return HttpResponse.json({
			access_token: 'mockaccesstoken',
			user: {
				id: 'mockuserid',
				firstName: 'mock',
				lastName: 'mock',
				phone: '+mock',
				country: 'mock',
				city: 'mock',
				email: 'mock@example.com',
				birthday: '1990-01-01T00:00:00.000Z',
				address: 'улица mock дом mock',
				avatarUrl: 'https://cdn.fastcup.net/logos/teams/20989_7n1la213o.png',
			},
		});
	}),
	http.get(process.env.API_URL + 'auth/signUp', () => {
		return HttpResponse.json({
			access_token: 'mockaccesstoken',
			user: {
				id: 'mockuserid',
				firstName: 'mock',
				lastName: 'mock',
				phone: '+mock',
				country: 'mock',
				city: 'mock',
				email: 'mock@example.com',
				birthday: '1990-01-01T00:00:00.000Z',
				address: 'улица mock дом mock',
				avatarUrl: 'https://cdn.fastcup.net/logos/teams/20989_7n1la213o.png',
			},
		});
	}),
	http.get(process.env.API_URL + 'auth/logout', () => {
		return HttpResponse.text('', { status: 200 });
	}),
	http.get(process.env.API_URL + 'auth/refresh', () => {
		return HttpResponse.json({
			access_token: 'mockaccesstoken',
			user: {
				id: 'mockuserid',
				firstName: 'mock',
				lastName: 'mock',
				phone: '+mock',
				country: 'mock',
				city: 'mock',
				email: 'mock@example.com',
				birthday: '1990-01-01T00:00:00.000Z',
				address: 'улица mock дом mock',
				avatarUrl: 'https://cdn.fastcup.net/logos/teams/20989_7n1la213o.png',
			},
		});
	}),
];
