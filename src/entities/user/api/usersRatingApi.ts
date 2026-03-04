import { ApiTags, baseApi } from '@/shared/config';
import { route } from '@/shared/libs';

import { usersRatingApiUrls } from '../model/constants/usersRatingConstants';
import type {
	GetUsersRatingBySpecializationResponse,
	UserProfilePositionResponse,
} from '../model/types/usersRating';

const usersRatingApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getUsersRatingBySpecialization: build.query<GetUsersRatingBySpecializationResponse, number>({
			query: (specializationId) => ({
				url: route(usersRatingApiUrls.getUsersRatingBySpecialization, specializationId),
			}),
			providesTags: [ApiTags.USERS_RATING],
		}),
		getUserProfilePosition: build.query<UserProfilePositionResponse, string>({
			async queryFn(profileId) {
				await new Promise((r) => setTimeout(r, 300));

				return {
					data: {
						userId: Number(profileId),
						username: 'Mock user',
						imageSrc: '',
						specialization: 'React developer',
						place: 1,
						ratingPoints: 9999,
						progress: 78,
						allUsers: 100,
					},
				};
			},

			// query: (profileId) => ({
			// 	url: route(usersRatingApiUrls.getUserProfilePosition, profileId),
			// }),
			// providesTags: [ApiTags.USERS_RATING],
		}),
	}),
});

export const { useGetUsersRatingBySpecializationQuery, useGetUserProfilePositionQuery } =
	usersRatingApi;
