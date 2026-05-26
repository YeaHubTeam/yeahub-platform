import { ApiTags, baseApi } from '@/shared/config';

import { featureFlagApiUrls, getFeatureFlagByIdUrl } from '../model/constants/featureFlags';
import {
	FeatureFlagApiItem,
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
		getFeatureFlagById: build.query<FeatureFlagApiItem, string>({
			query: (id) => ({
				url: getFeatureFlagByIdUrl(id),
			}),
			providesTags: [ApiTags.FEATURE_FLAG_DETAIL],
		}),
	}),
});

export const { useGetFeatureFlagsListQuery, useGetFeatureFlagByIdQuery } = featureFlagApi;
