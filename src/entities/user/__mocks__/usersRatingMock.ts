import { DefaultBodyType, http, HttpResponse } from 'msw';

import { usersRatingApiUrls } from '../model/constants/usersRatingConstants';
import type { GetUsersRatingResponse } from '../model/types/usersRating';

import { sortedUsers } from './data/usersRatingMock';

export const usersRatingMock = http.get<
	Record<string, string>,
	DefaultBodyType,
	GetUsersRatingResponse
>(`${process.env.API_URL}${usersRatingApiUrls.getUsersRating}`, ({ request }) => {
	const url = new URL(request.url);
	const page = url.searchParams.get('page') ?? 1;
	const limit = url.searchParams.get('limit') ?? 10;

	const paginationData = sortedUsers.slice(
		(Number(page) - 1) * Number(limit),
		Number(page) * Number(limit),
	);

	const data = {
		data: paginationData,
		limit: Number(limit),
		page: Number(page),
		total: sortedUsers.length,
	};

	return HttpResponse.json(data);
});
