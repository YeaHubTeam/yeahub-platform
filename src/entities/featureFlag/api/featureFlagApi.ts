import { ApiTags, baseApi } from '@/shared/config';

import { featureFlagApiUrls } from '../model/constants/featureFlags';
import {
	GetFeatureFlagsListParamsRequest,
	GetFeatureFlagsListResponse,
} from '../model/types/featureFlag';

export const featureFlagApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getFeatureFlagsList: build.query<GetFeatureFlagsListResponse, GetFeatureFlagsListParamsRequest>(
			{
				query: (params) => ({
					url: featureFlagApiUrls.getFeatureFlagsList,
					params: { page: 1, limit: 10, clientType: 'WEB', ...params },
				}),
				providesTags: [ApiTags.FEATURE_FLAGS],
			},
		),
	}),
});

export const { useGetFeatureFlagsListQuery } = featureFlagApi;
