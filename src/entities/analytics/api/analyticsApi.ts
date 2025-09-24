import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';

import { analyticsApiUrls } from '../model/constants/analyticsConstants';
import { PopularSkillsResponse } from '../model/types/analytics';

export const analyticsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getPopularSkills: builder.query<PopularSkillsResponse, void>({
			query: () => analyticsApiUrls.popularSkills,
			providesTags: [ApiTags.POPULAR_SKILLS],
		}),
	}),
});

export const { useGetPopularSkillsQuery } = analyticsApi;
