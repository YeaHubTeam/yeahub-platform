import { baseApi } from '@/shared/config/api/baseApi';

import { HhAnalyticsItemResponse } from '@/entities/hhAnalytics/model/types/hhAnalytics';

const hhAnalyticsApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getHhTopBySpec: build.query<HhAnalyticsItemResponse, number>({
			query: (specId) => ({
				url: `/hh-parser/top-by-spec/${specId}`,
			}),
		}),
	}),
});

export const { useGetHhTopBySpecQuery } = hhAnalyticsApi;
