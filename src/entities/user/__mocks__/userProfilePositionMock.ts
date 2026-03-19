import { DefaultBodyType, http, HttpResponse } from 'msw';

import { usersRatingApiUrls } from '../model/constants/usersRatingConstants';
import type { UserProfilePositionResponse } from '../model/types/usersRating';

export const userProfilePositionMock = http.get<
	Record<string, string>,
	DefaultBodyType,
	UserProfilePositionResponse
>(`${process.env.API_URL}${usersRatingApiUrls.getUserProfilePosition}`, ({ params }) => {
	const { profileId } = params;

	return HttpResponse.json({
		userId: profileId,
		username: 'Mock user',
		avatarUrl: '',
		specialization: 'React developer',
		place: 1,
		ratingPoints: 9999,
		progress: 78,
		allUsers: 100,
	});
});
