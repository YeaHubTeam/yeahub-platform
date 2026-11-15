import { ApiTags, baseApi } from '@/shared/config';

import { articleApiUrls } from '../model/constants/article';
import { GetArticlesListParamsRequest, GetArticlesListResponse } from '../model/types/article';

const articleApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getArticlesList: build.query<GetArticlesListResponse, GetArticlesListParamsRequest>({
			query: (params) => {
				const searchParams = new URLSearchParams();

				const append = (key: string, value: unknown) => {
					if (value === undefined || value === null || value === '') return;
					searchParams.append(key, String(value));
				};

				Object.entries(params ?? {}).forEach(([key, value]) => {
					if (Array.isArray(value)) {
						value.forEach((item) => append(key, item));
						return;
					}
					append(key, value);
				});

				const queryString = searchParams.toString();

				return {
					url: queryString
						? `${articleApiUrls.getArticlesList}?${queryString}`
						: articleApiUrls.getArticlesList,
				};
			},
			providesTags: [ApiTags.ARTICLES],
		}),
	}),
});

export const { useGetArticlesListQuery } = articleApi;
