import { ApiTags, baseApi } from '@/shared/config';
import { route } from '@/shared/libs';

import { usersRatingApiUrls } from '../model/constants/usersRatingConstants';
import type { GetUsersRatingBySpecializationResponse } from '../model/types/usersRating';

const usersRatingApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getUsersRatingBySpecialization: build.query<GetUsersRatingBySpecializationResponse, number>({
			query: (specializationId) => ({
				url: route(usersRatingApiUrls.getUsersRatingBySpecialization, specializationId),
			}),
			providesTags: [ApiTags.USERS_RATING],
		}),
	}),
});

export const { useGetUsersRatingBySpecializationQuery } = usersRatingApi;
