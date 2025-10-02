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
} from '../model/types/resource';
import {
	GetResourceRequestsResponse,
	GetResourceRequestsParams,
	GetResourceRequestParams,
	ResourceRequest,
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
		getResourceRequests: build.query<GetResourceRequestsResponse, GetResourceRequestsParams>({
			query: (params) => ({
				url: resourceApiUrls.getResourceRequests,
				params: { page: 1, limit: 10, ...params },
			}),
			providesTags: [ApiTags.RESOURCE_REQUESTS],
		}),
		getResourseRequestById: build.query<ResourceRequest, GetResourceRequestParams>({
			query: ({ requestId }) => ({
				url: route(resourceApiUrls.getResourceRequestById, requestId || ''),
			}),
			providesTags: [ApiTags.RESOURCE_REQUEST],
		}),
	}),
});

export const {
	useGetResourcesListQuery,
	useGetResourceTypesQuery,
	useGetResourceByIdQuery,
	useGetMyRequestsResourcesQuery,
	useGetResourceRequestsQuery,
	useGetResourseRequestByIdQuery,
} = resourceApi;
export type { GetResourcesListParamsRequest, GetResourcesListResponse };
