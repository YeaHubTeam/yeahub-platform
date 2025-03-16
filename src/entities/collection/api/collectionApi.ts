import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { route } from '@/shared/helpers/route';

import { collectionApiUrls } from '../model/constants/collection';
import {
	GetCollectionByIdParamsRequest,
	GetCollectionByIdResponse,
	GetCollectionsListParamsRequest,
	GetCollectionsListResponse,
} from '../model/types/collection';

const collectionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getCollectionsList: build.query<GetCollectionsListResponse, GetCollectionsListParamsRequest>({
			query: (params) => ({
				url: collectionApiUrls.getCollectionsList,
				params: {
					page: params.page || 1,
					limit: params.limit || 10,
					titleOrDescriptionSearch: params.titleOrDescriptionSearch || '',
					keywords: params.keywords || [],
					specializations: params.specialization || [],
				},
			}),
			providesTags: [ApiTags.COLLECTIONS],
		}),
		getCollectionById: build.query<GetCollectionByIdResponse, GetCollectionByIdParamsRequest>({
			query: ({ collectionId }) => ({
				url: route(collectionApiUrls.getCollectionById, collectionId || ''),
			}),
			providesTags: [ApiTags.COLLECTIONS],
		}),
	}),
});
export const { useGetCollectionsListQuery, useGetCollectionByIdQuery } = collectionApi;
