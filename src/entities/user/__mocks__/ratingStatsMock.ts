import { http, HttpResponse } from 'msw';

import { specializationsMock } from '@/entities/specialization/@x/user';

import { userApiUrls } from '../model/constants/userConstants';
import { GetRatingStatsResponse } from '../model/types/user';

export const ratingStatsMock = http.get(`*${userApiUrls.getRatingStats}`, ({ request }) => {
	const url = new URL(request.url);
	const specializationId = Number(url.searchParams.get('specializationId'));

	const specialization = specializationsMock.data.find((spec) => spec.id === specializationId);

	return HttpResponse.json<GetRatingStatsResponse>({
		specialization: specialization!,
		allUsers: 1842,
		allQuestions: 756,
		averageProgress: 42,
	});
});
