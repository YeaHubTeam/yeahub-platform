import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { toast } from '@/shared/ui/Toast';

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
			invalidatesTags: [ApiTags.QUESTION_DETAIL, ApiTags.QUESTIONS],
			async onQueryStarted() {
				try {
					toast.success(i18n.t(Translation.TOAST_QUESTIONS_RESET_PROGRESS_SUCCESS));
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_QUESTIONS_RESET_PROGRESS_FAILED));
					// eslint-disable-next-line no-console
					console.log(error);
				}
			},
		}),
	}),
});

export const { useResetQuestionProgressMutation } = resetQuestionProgressApi;
