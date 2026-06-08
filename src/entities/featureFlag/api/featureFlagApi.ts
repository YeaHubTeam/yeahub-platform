import { ApiTags, baseApi } from '@/shared/config';
import { route } from '@/shared/libs';

import { featureFlagApiUrls } from '../model/constants/featureFlags';
import {
	GetFeatureFlagByIdResponse,
	GetFeatureFlagsListParamsRequest,
	GetFeatureFlagsListResponse,
} from '../model/types/featureFlag';

export const featureFlagApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getFeatureFlagsList: build.query<GetFeatureFlagsListResponse, GetFeatureFlagsListParamsRequest>(
			{
				query: (params) => ({
					url: featureFlagApiUrls.getFeatureFlagsList,
					params: { page: 1, limit: 10, ...params },
				}),
				providesTags: [ApiTags.FEATURE_FLAGS],
			},
		),
		getFeatureFlagById: build.query<GetFeatureFlagByIdResponse, string>({
			query: (flagId) => ({
				url: route(featureFlagApiUrls.getFeatureFlagById, flagId),
			}),
			providesTags: [ApiTags.FEATURE_FLAG_DETAIL],
		}),
	}),
});

export const { useGetFeatureFlagsListQuery, useGetFeatureFlagByIdQuery } = featureFlagApi;
