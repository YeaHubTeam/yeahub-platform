import { DefaultBodyType, http, HttpResponse } from 'msw';

import { usersRatingApiUrls } from '../model/constants/usersRatingConstants';
import type { UsersRatingBySpecialization } from '../model/types/usersRating';

import { usersRatingMock } from './data/usersRatingMock';

export const usersRatingBySpecializationMock = http.get<
	Record<string, string>,
	DefaultBodyType,
	UsersRatingBySpecialization
>(`${process.env.API_URL}${usersRatingApiUrls.getUsersRatingBySpecialization}`, ({ params }) => {
	const { specializationId } = params;

	const data = usersRatingMock.find(
		({ specialization }) => specialization.id === Number(specializationId),
	);

	return HttpResponse.json(data);
});
