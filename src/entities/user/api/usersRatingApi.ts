import { ApiTags, baseApi } from '@/shared/config';
import { route } from '@/shared/libs';

import { usersRatingApiUrls } from '../model/constants/usersRatingConstants';
import type {
	GetUsersRatingBySpecializationResponse,
	GetUsersRatingRequest,
	GetUsersRatingResponse,
	UserProfilePositionResponse,
	GetUsersRatingStatsResponse,
} from '../model/types/usersRating';

const usersRatingApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getUsersRatingBySpecialization: build.query<GetUsersRatingBySpecializationResponse, number>({
			query: (specializationId) => ({
				url: route(usersRatingApiUrls.getUsersRatingBySpecialization, specializationId),
			}),
			providesTags: [ApiTags.USERS_RATING],
		}),
		getUsersRating: build.query<GetUsersRatingResponse, GetUsersRatingRequest>({
			query: (params) => ({
				url: route(usersRatingApiUrls.getUsersRating),
				params,
			}),
			providesTags: [ApiTags.USERS_RATING],
		}),
		getUsersRatingStats: build.query<GetUsersRatingStatsResponse, number>({
			query: (specializationId) => ({
				url: route(usersRatingApiUrls.getUsersRatingStats),
				params: { specializationId },
			}),
			providesTags: [ApiTags.USERS_RATING],
		}),
		getUserProfilePosition: build.query<UserProfilePositionResponse, string>({
			query: (profileId) => ({
				url: route(usersRatingApiUrls.getUserProfilePosition, profileId),
			}),
			providesTags: [ApiTags.USERS_RATING],
		}),
	}),
});

export const {
	useGetUsersRatingBySpecializationQuery,
	useGetUsersRatingQuery,
	useGetUserProfilePositionQuery,
	useGetUsersRatingStatsQuery,
} = usersRatingApi;
