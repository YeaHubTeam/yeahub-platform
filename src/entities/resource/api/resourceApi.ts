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
	GetMyRequestsResourcesParamsRequest,
	GetMyRequestsResourcesResponse,
	ResourceRequest,
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
			providesTags: [ApiTags.RESOURCES_TYPES],
		}),
		getResourceById: build.query<GetResourceByIdResponse, GetResourceByIdParamsRequest>({
			query: ({ resourceId }) => ({
				url: route(resourceApiUrls.getResourceById, resourceId || ''),
			}),
			providesTags: [ApiTags.RESOURCES],
		}),
		getMyRequestsResources: build.query<
			GetMyRequestsResourcesResponse,
			GetMyRequestsResourcesParamsRequest
		>({
			query: (params) => ({
				url: resourceApiUrls.getMyRequestsResources,
				params: {
					page: 1,
					limit: 10,
					...params,
				},
			}),
			providesTags: [ApiTags.RESOURCES_MY_REQUESTS],
		}),
		getMyRequestsResourcesReviewCount: build.query<
			number,
			GetMyRequestsResourcesParamsRequest | void
		>({
			query: (params = {}) => ({
				url: resourceApiUrls.getMyRequestsResources,
				params: { page: 1, limit: 1, status: 'pending', ...params },
			}),
			transformResponse: (response: GetMyRequestsResourcesResponse) => response.total ?? 0,
			providesTags: [ApiTags.RESOURCES_MY_REQUESTS],
		}),
		getResourceRequests: build.query<GetResourceRequestsResponse, GetResourceRequestsParams>({
			query: (params) => ({
				url: resourceApiUrls.getResourceRequests,
				params: { page: 1, limit: 10, ...params },
			}),
			providesTags: [ApiTags.RESOURCE_REQUESTS],
		}),
		getResourceRequestsReviewCount: build.query<number, GetResourceRequestsParams | void>({
			query: (params) => ({
				url: resourceApiUrls.getResourceRequests,
				params: { page: 1, limit: 1, status: 'pending', ...params },
			}),
			transformResponse: (response: GetResourceRequestsResponse): number => response.total ?? 0,
		}),
		getResourceRequestById: build.query<ResourceRequest, string>({
			query: (resourceId) => ({
				url: route(resourceApiUrls.getResourceRequestById, resourceId),
			}),
			providesTags: [ApiTags.RESOURCE_REQUESTS],
		}),
	}),
});

export const {
	useGetResourcesListQuery,
	useGetResourceTypesQuery,
	useGetResourceByIdQuery,
	useGetMyRequestsResourcesQuery,
	useGetResourceRequestsQuery,
	useGetMyRequestsResourcesReviewCountQuery,
	useGetResourceRequestsReviewCountQuery,
	useGetResourceRequestByIdQuery,
} = resourceApi;
export type { GetResourcesListParamsRequest, GetResourcesListResponse };
