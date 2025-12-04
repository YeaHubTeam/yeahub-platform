import { i18n, Translation, ApiTags, baseApi } from '@/shared/config';
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
			invalidatesTags: [
				ApiTags.QUESTIONS,
				ApiTags.QUESTION_DETAIL,
				ApiTags.QUESTIONS_LEARN,
				ApiTags.INTERVIEW_STATISTICS,
				ApiTags.QUESTIONS_LEARNED,
			],
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
