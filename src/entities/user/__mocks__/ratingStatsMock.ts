import { http, HttpResponse } from 'msw';

import { Specialization, specializationsMock } from '@/entities/specialization/@x/user';

import { userApiUrls } from '../model/constants/userConstants';
import { GetRatingStatsResponse } from '../model/types/user';

export const ratingStatsMock = http.get(`*${userApiUrls.getRatingStats}`, ({ request }) => {
	const url = new URL(request.url);
	const specializationId = Number(url.searchParams.get('specializationId'));

	const foundSpecialization = specializationsMock.data.find(
		(spec: Specialization) => spec.id === specializationId,
	);

	const fallbackSpecialization = specializationsMock.data[0];

	return HttpResponse.json<GetRatingStatsResponse>({
		specialization: foundSpecialization || fallbackSpecialization,
		allUsers: 1842,
		allQuestions: 756,
		averageProgress: 42,
	});
});
