import { ApiTags, baseApi } from '@/shared/config';

import { articleApiUrls } from '../model/constants/article';
import { GetArticlesListParamsRequest, GetArticlesListResponse } from '../model/types/article';

const articleApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getArticlesList: build.query<GetArticlesListResponse, GetArticlesListParamsRequest>({
			query: (params) => ({
				url: articleApiUrls.getArticlesList,
				params,
			}),
			providesTags: [ApiTags.ARTICLES],
		}),
	}),
});

export const { useGetArticlesListQuery } = articleApi;
