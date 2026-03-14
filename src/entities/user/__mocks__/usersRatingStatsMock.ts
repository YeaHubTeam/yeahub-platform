import { DefaultBodyType, http, HttpResponse } from 'msw';

import { specializationsMock } from '@/entities/specialization/@x/user';

import { usersRatingApiUrls } from '../model/constants/usersRatingConstants';
import type { GetUsersRatingStatsResponse } from '../model/types/usersRating';

export const usersRatingStatsMock = http.get<
	Record<string, string>,
	DefaultBodyType,
	GetUsersRatingStatsResponse
>(`${process.env.API_URL}${usersRatingApiUrls.getUsersRatingStats}`, ({ request }) => {
	const url = new URL(request.url);
	const specializationId = url.searchParams.get('specializationId');

	const specialization = specializationsMock.data.find((s) => String(s.id) === specializationId);

	const defaultSpecialization = specializationsMock.data[0];

	const data = {
		allUsers: 12,
		averageProgress: 40,
		allQuestions: 1200,
		specialization: specialization || defaultSpecialization,
	};

	return HttpResponse.json(data);
});
