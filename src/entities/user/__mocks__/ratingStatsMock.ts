import { http, HttpResponse } from 'msw';

import { Specialization, specializationsMock } from '@/entities/specialization/@x/user';

import { userApiUrls } from '../model/constants/userConstants';
import { GetRatingStatsResponse, RatingSpecialization } from '../model/types/user';

export const ratingStatsMock = http.get(`*${userApiUrls.getRatingStats}`, ({ request }) => {
	const url = new URL(request.url);
	const specializationId = Number(url.searchParams.get('specializationId'));

	const foundSpecialization = specializationsMock.data.find(
		(spec: Specialization) => spec.id === specializationId,
	);

	const fallbackSpecialization = specializationsMock.data[0];
	const spec = foundSpecialization || fallbackSpecialization;

	const mockSpecialization: RatingSpecialization = {
		id: spec.id,
		title: spec.title,
		slug: spec.title.toLowerCase().replace(/\s+/g, '-'),
		description: 'Описание специализации',
		imageSrc: null,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};

	return HttpResponse.json<GetRatingStatsResponse>({
		specialization: mockSpecialization,
		allUsers: 1842,
		allQuestions: 756,
		averageProgress: 42,
	});
});
