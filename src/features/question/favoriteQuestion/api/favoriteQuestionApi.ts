import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { route } from '@/shared/helpers/route';
import { toast } from '@/shared/ui/Toast';

import { favoriteQuestionApiUrls } from '../model/constants/favoriteQuestionConstants';
import { FavoriteQuestionParams } from '../model/types/favoriteQuestionTypes';

const favoriteQuestionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		addFavoriteQuestion: build.mutation<void, FavoriteQuestionParams>({
			query: ({ profileId, questionId }) => ({
				url: route(favoriteQuestionApiUrls.addFavoriteQuestion, profileId, questionId),
				method: 'POST',
			}),
			invalidatesTags: (_result, _error, { quiz }: { quiz: boolean }) => {
				return quiz ? [ApiTags.INTERVIEW_QUIZ] : [ApiTags.QUESTIONS, ApiTags.QUESTION_DETAIL];
			},
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
		resetFavoriteQuestion: build.mutation<void, FavoriteQuestionParams>({
			query: ({ profileId, questionId }) => ({
				url: route(favoriteQuestionApiUrls.resetFavoriteQuestion, profileId, questionId),
				method: 'DELETE',
			}),
			invalidatesTags: (_result, _error, { quiz }: { quiz: boolean }) => {
				return quiz ? [ApiTags.INTERVIEW_QUIZ] : [ApiTags.QUESTIONS, ApiTags.QUESTION_DETAIL];
			},
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

export const { useAddFavoriteQuestionMutation, useResetFavoriteQuestionMutation } =
	favoriteQuestionApi;
