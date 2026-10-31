import { ApiTags, baseApi } from '@/shared/config';

import { articleApiUrls } from '../model/constants/article';
import {
	GetArticlesListParamsRequest,
	GetArticlesListResponse,
	GetPublicArticlesListParamsRequest,
	GetPublicArticlesListResponse,
} from '../model/types/article';

const articleApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getArticlesList: build.query<GetArticlesListResponse, GetArticlesListParamsRequest>({
			query: (params) => ({
				url: articleApiUrls.getArticlesList,
				params,
			}),
			providesTags: [ApiTags.ARTICLES],
		}),

		getPublicArticlesList: build.query<
			GetPublicArticlesListResponse,
			GetPublicArticlesListParamsRequest
		>({
			query: (params) => ({
				url: articleApiUrls.getPublicArticlesList,
				params: { page: 1, limit: 10, ...params },
			}),
			providesTags: [ApiTags.ARTICLES],
		}),
	}),
});

export const { useGetArticlesListQuery, useGetPublicArticlesListQuery } = articleApi;
