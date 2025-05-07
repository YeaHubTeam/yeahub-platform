import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { COLLECTION_QUESTIONS_LIMIT } from '@/shared/constants/queryConstants';
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
			query: ({ collectionId }) => ({
				url: route(collectionApiUrls.getCollectionQuestions, collectionId || ''),
				params: { limit: COLLECTION_QUESTIONS_LIMIT },
			}),
			providesTags: [ApiTags.COLLECTIONS],
		}),
	}),
});
export const {
	useGetCollectionsListQuery,
	useGetCollectionByIdQuery,
	useGetCollectionQuestionsQuery,
} = collectionApi;
