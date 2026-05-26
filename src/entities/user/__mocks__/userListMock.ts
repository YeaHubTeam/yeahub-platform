import { DefaultBodyType, http, HttpResponse } from 'msw';

import { userApiUrls } from '../model/constants/userConstants';
import type { GetUsersListResponse } from '../model/types/user';

import { usersDataMock } from './data/usersDataMock';

export const usersListMock = http.get<
	Record<string, string>,
	DefaultBodyType,
	GetUsersListResponse
>(`${process.env.API_URL}${userApiUrls.getUsersList}`, ({ request }) => {
	const url = new URL(request.url);

	const page = Number(url.searchParams.get('page')) || 1;
	const limit = Number(url.searchParams.get('limit')) || 10;
	const search = url.searchParams.get('search') ?? '';
	const roles = url.searchParams.get('roles') ?? '';
	const isVerified = url.searchParams.get('isVerified');

	const roleIds = roles.split(',').map(Number).filter(Boolean);

	const filteredUsers = usersDataMock.data.filter((user) => {
		const matchesSearch = user.username.toLowerCase().includes(search.toLowerCase());

		const matchesRoles =
			roleIds.length === 0 || user.userRoles.some((role) => roleIds.includes(role.id));

		const matchesIsVerified = isVerified === null || user.isVerified === (isVerified === 'true');

		return matchesSearch && matchesRoles && matchesIsVerified;
	});

	const start = (page - 1) * limit;
	const end = start + limit;

	const paginatedUsers = filteredUsers.slice(start, end);

	return HttpResponse.json({
		data: paginatedUsers,
		total: filteredUsers.length,
		page,
		limit,
	});
});
