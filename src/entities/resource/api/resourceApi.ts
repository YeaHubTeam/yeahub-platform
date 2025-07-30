import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';

import { resourceApiUrls } from '../model/constants/resource';
import { GetResourcesListParamsRequest, GetResourcesListResponse } from '../model/types/resource';

const resourceApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getResourcesList: build.query<GetResourcesListResponse, GetResourcesListParamsRequest>({
			query: (params) => ({
				url: resourceApiUrls.getResourcesList,
				params: { page: 1, limit: 10, ...params },
			}),
			providesTags: [ApiTags.RESOURCES],
		}),
	}),
});

export const { useGetResourcesListQuery } = resourceApi;
export type { GetResourcesListParamsRequest, GetResourcesListResponse };
