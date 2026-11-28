import { ApiTags, baseApi } from '@/shared/config';
import { route } from '@/shared/libs';

import { articleApiUrls } from '../model/constants/article';
import {
	GetArticleByIdParamsRequest,
	GetArticleByIdResponse,
	GetArticlesListParamsRequest,
	GetArticlesListResponse,
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
		getArticleById: build.query<GetArticleByIdResponse, GetArticleByIdParamsRequest>({
			query: ({ articleId }) => ({
				url: route(articleApiUrls.getArticleById, articleId || ''),
			}),
			providesTags: [ApiTags.ARTICLE_DETAIL],
		}),
	}),
});

export const { useGetArticlesListQuery, useGetArticleByIdQuery } = articleApi;
