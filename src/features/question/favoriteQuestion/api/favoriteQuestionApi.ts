import { i18n, Translation, ApiTags, baseApi } from '@/shared/config';
import { route } from '@/shared/libs';
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
