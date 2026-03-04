import { ApiTags, baseApi } from '@/shared/config';
import { route } from '@/shared/libs';

import { usersRatingApiUrls } from '../model/constants/usersRatingConstants';
import type {
	GetUsersRatingBySpecializationResponse,
	GetUsersRatingResponse,
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
		getUsersRating: build.query<
			GetUsersRatingResponse,
			{ specializationId: number; page: number; limit: number }
		>({
			query: ({ specializationId, page, limit }) => ({
				url: route(usersRatingApiUrls.getUsersRating),
				params: { specializationId, page, limit },
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
	}),
});

export const {
	useGetUsersRatingBySpecializationQuery,
	useGetUsersRatingQuery,
	useGetUsersRatingStatsQuery,
} = usersRatingApi;
