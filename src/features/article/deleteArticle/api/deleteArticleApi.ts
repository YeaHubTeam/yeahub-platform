import { i18n, Translation, ApiTags, baseApi } from '@/shared/config';
import { route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { deleteArticleApiUrls } from '../model/constants/deleteArticleConstants';
import { DeleteArticleRequest } from '../model/types/articleDeleteTypes';

const deleteArticleApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		deleteArticle: build.mutation<void, DeleteArticleRequest>({
			query: (articleId) => ({
				url: route(deleteArticleApiUrls.deleteArticle, articleId),
				method: 'DELETE',
			}),
			invalidatesTags: [ApiTags.ARTICLES],
			async onQueryStarted(_, { queryFulfilled }) {
				try {
					await queryFulfilled;
					toast.success(i18n.t(Translation.TOAST_ARTICLE_DELETE_SUCCESS));
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_ARTICLE_DELETE_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
		}),
	}),
});

export const { useDeleteArticleMutation } = deleteArticleApi;
