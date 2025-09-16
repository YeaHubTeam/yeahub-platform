import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { route } from '@/shared/helpers/route';

import { resourceApiUrls } from '../model/constants/resource';
import {
	GetResourceTypesResponse,
	GetResourcesListParamsRequest,
	GetResourcesListResponse,
	GetResourceByIdResponse,
	GetResourceByIdParamsRequest,
} from '../model/types/resource';
import {
	GetResourceRequestsResponse,
	GetResourceRequestsParams,
} from '../model/types/resourceRequest';

const resourceApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getResourcesList: build.query<GetResourcesListResponse, GetResourcesListParamsRequest>({
			query: (params) => ({
				url: resourceApiUrls.getResourcesList,
				params: { page: 1, limit: 10, ...params },
			}),
			providesTags: [ApiTags.RESOURCES],
		}),
		getResourceTypes: build.query<GetResourceTypesResponse, void>({
			query: () => ({
				url: resourceApiUrls.getResourceTypes,
			}),
			providesTags: [ApiTags.RESOURCESTYPES],
		}),
		getResourceById: build.query<GetResourceByIdResponse, GetResourceByIdParamsRequest>({
			query: ({ resourceId }) => ({
				url: route(resourceApiUrls.getResourceById, resourceId || ''),
			}),
			providesTags: [ApiTags.RESOURCES],
		}),
		getResourceRequests: build.query<GetResourceRequestsResponse, GetResourceRequestsParams>({
			query: (params) => ({
				url: resourceApiUrls.getResourceRequests,
				params: { page: 1, limit: 10, ...params },
			}),
			providesTags: [ApiTags.RESOURCE_REQUESTS],
		}),
	}),
});

export const {
	useGetResourcesListQuery,
	useGetResourceTypesQuery,
	useGetResourceByIdQuery,
	useGetResourceRequestsQuery,
} = resourceApi;
export type { GetResourcesListParamsRequest, GetResourcesListResponse };
