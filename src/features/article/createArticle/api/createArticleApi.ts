import { i18n, Translation, ApiTags, baseApi, ROUTES, ExtraArgument } from '@/shared/config';
import { route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { createArticleApiUrls } from '../model/constants/createArticleConstants';
import {
	CreateArticleBodyRequest,
	CreateArticleFormValues,
	CreateArticleResponse,
} from '../model/types/articleCreateTypes';

export const createArticleApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createArticle: build.mutation<CreateArticleResponse, CreateArticleFormValues>({
			query: (article) => {
				const payload: CreateArticleBodyRequest = {
					...article,
					status: 'published',
				};

				return {
					url: createArticleApiUrls.createArticle,
					method: 'POST',
					body: payload,
				};
			},

			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					const result = await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate(route(ROUTES.admin.articles.details.page, result.data.id));
					toast.success(i18n.t(Translation.TOAST_ARTICLE_CREATE_SUCCESS));
					//eslint-disable-next-line
				} catch (error: unknown) {
					toast.error(i18n.t(Translation.TOAST_ARTICLE_CREATE_FAILED));
				}
			},
			invalidatesTags: [ApiTags.ARTICLES],
		}),
	}),
});

export const { useCreateArticleMutation } = createArticleApi;
