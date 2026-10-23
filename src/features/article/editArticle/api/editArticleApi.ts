import { i18n, Translation, ApiTags, baseApi, ROUTES, ExtraArgument } from '@/shared/config';
import { handleApiError, route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { getEditArticleApiErrorMessage } from '../lib/utils/getEditArticleApiErrorMessge';
import { editArticleApiUrls } from '../model/constants/editArticleApiUrls';
import {
	EditArticleBodyRequest,
	EditArticleFormValues,
	EditArticleResponse,
} from '../model/types/articleEditTypes';

export const editArticleApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		editArticle: build.mutation<EditArticleResponse, EditArticleFormValues>({
			query: (article) => {
				const payload: EditArticleBodyRequest = {
					...article,
					status: 'published',
				};

				return {
					url: route(editArticleApiUrls.edit, article.id),
					method: 'PUT',
					body: payload,
				};
			},

			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					const result = await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate(route(ROUTES.admin.articles.details.page, result.data.id));
					toast.success(i18n.t(Translation.TOAST_ARTICLE_EDIT_SUCCESS));
				} catch (error) {
					toast.error(i18n.t(handleApiError(error, getEditArticleApiErrorMessage)));
				}
			},
			invalidatesTags: [ApiTags.ARTICLES, ApiTags.ARTICLE_DETAIL],
		}),
	}),
});

export const { useEditArticleMutation } = editArticleApi;
