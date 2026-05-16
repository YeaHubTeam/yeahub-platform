import { ApiTags, baseApi } from '@/shared/config';

import { featureFlagApiUrls } from '../model/constants/featureFlags';
import {
	GetFeatureFlagsListParamsRequest,
	GetFeatureFlagsListResponse,
	FeatureFlagApiItem,
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
		getFeatureFlagById: build.query<FeatureFlagApiItem, string>({
			query: (id) => ({
				url: `feature-flags/${id}`,
				method: 'GET',
			}),
			providesTags: (result, error, id) => [{ type: ApiTags.FEATURE_FLAGS, id }],
		}),
		updateFeatureFlagStatus: build.mutation<FeatureFlagApiItem, { id: string; enabled: boolean }>({
			query: ({ id, enabled }) => ({
				url: `feature-flags/${id}`,
				method: 'PATCH',
				body: { enabled },
			}),
			invalidatesTags: (result, error, { id }) => [{ type: ApiTags.FEATURE_FLAGS, id }],
		}),
	}),
});

export const {
	useGetFeatureFlagsListQuery,
	useGetFeatureFlagByIdQuery,
	useUpdateFeatureFlagStatusMutation,
} = featureFlagApi;
