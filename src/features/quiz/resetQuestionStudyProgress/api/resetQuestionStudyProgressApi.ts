import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { handleRequestToast } from '@/shared/helpers/handleRequestToast';

import {
	ResetQuestionStudyProgressParams,
	ResetQuestionStudyProgressResponse,
} from '../model/types/resetQuestionStudyProgressTypes';

const resetQuestionProgressApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		resetQuestionProgress: build.mutation<
			ResetQuestionStudyProgressResponse,
			ResetQuestionStudyProgressParams
		>({
			query: ({ profileId, questionId }) => ({
				url: `/interview-preparation/learn/${profileId}/reset/${questionId}`,
				method: 'PUT',
			}),
			invalidatesTags: [ApiTags.QUESTION_DETAIL, ApiTags.QUESTIONS, ApiTags.QUESTIONS_LEARNED],
			async onQueryStarted() {
				handleRequestToast({
					successMessage: Translation.TOAST_QUESTIONS_RESET_PROGRESS_SUCCESS,
					failedMessage: Translation.TOAST_QUESTIONS_RESET_PROGRESS_FAILED,
				});
			},
		}),
	}),
});

export const { useResetQuestionProgressMutation } = resetQuestionProgressApi;
