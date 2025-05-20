import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { route } from '@/shared/helpers/route';

import { collectionApiUrls } from '../model/constants/collection';
import {
	GetCollectionByIdParamsRequest,
	GetCollectionByIdResponse,
	GetCollectionQuestionsResponse,
	GetCollectionsListParamsRequest,
	GetCollectionsListResponse,
} from '../model/types/collection';

const collectionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getPublicCollectionsList: build.query<
			GetCollectionsListResponse,
			GetCollectionsListParamsRequest
		>({
			query: (params) => ({
				url: collectionApiUrls.getPublicCollectionsList,
				params: { page: 1, limit: 10, ...params },
			}),
			providesTags: [ApiTags.COLLECTIONS],
		}),
		getCollectionsList: build.query<GetCollectionsListResponse, GetCollectionsListParamsRequest>({
			query: (params) => ({
				url: collectionApiUrls.getCollectionsList,
				params: { page: 1, limit: 10, ...params },
			}),
			providesTags: [ApiTags.COLLECTIONS],
		}),
		getCollectionById: build.query<GetCollectionByIdResponse, GetCollectionByIdParamsRequest>({
			query: ({ collectionId }) => ({
				url: route(collectionApiUrls.getCollectionById, collectionId || ''),
			}),
			providesTags: [ApiTags.COLLECTIONS],
		}),
		getCollectionQuestions: build.query<
			GetCollectionQuestionsResponse,
			GetCollectionByIdParamsRequest
		>({
			query: (params) => ({
				url: route(collectionApiUrls.getCollectionQuestions, params.collectionId || ''),
				params: { limit: params.limit },
			}),
			providesTags: [ApiTags.COLLECTIONS],
		}),
	}),
});
export const {
	useGetPublicCollectionsListQuery,
	useGetCollectionsListQuery,
	useGetCollectionByIdQuery,
	useGetCollectionQuestionsQuery,
} = collectionApi;
