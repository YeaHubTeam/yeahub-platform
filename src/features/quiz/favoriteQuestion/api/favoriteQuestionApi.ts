import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { toast } from '@/shared/ui/Toast';

import {
	FavoriteQuestionParams,
	FavoriteQuestionResponse,
} from '@/features/quiz/favoriteQuestion/model/favoriteQuestionTypes';

const favoriteQuestionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		favoriteQuestion: build.mutation<FavoriteQuestionResponse, FavoriteQuestionParams>({
			query: ({ profileId, questionId }) => ({
				url: `/questions/favorites/${profileId}/${questionId}`,
				method: 'POST',
			}),
			invalidatesTags: [ApiTags.QUESTIONS, ApiTags.QUESTION_DETAIL],
			async onQueryStarted() {
				try {
					toast.success(i18n.t(Translation.TOAST_QUESTIONS_FAVORITE_SUCCESS));
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_QUESTIONS_FAVORITE_FAILED));
					// eslint-disable-next-line no-console
					console.log(error);
				}
			},
		}),
		resetFavoriteQuestion: build.mutation<FavoriteQuestionResponse, FavoriteQuestionParams>({
			query: ({ profileId, questionId }) => ({
				url: `/questions/favorites/${profileId}/${questionId}`,
				method: 'DELETE',
			}),
			invalidatesTags: [ApiTags.QUESTIONS, ApiTags.QUESTION_DETAIL],
			async onQueryStarted() {
				try {
					toast.success(i18n.t(Translation.TOAST_QUESTIONS_RESET_FAVORITE_SUCCESS));
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_QUESTIONS_RESET_FAVORITE_FAILED));
					// eslint-disable-next-line no-console
					console.log(error);
				}
			},
		}),
	}),
});

export const { useFavoriteQuestionMutation, useResetFavoriteQuestionMutation } =
	favoriteQuestionApi;
