import { i18n, Translation, ApiTags, baseApi } from '@/shared/config';
import { toast } from '@/shared/ui/Toast';

import { LearnQuestionParams, LearnQuestionResponse } from '../model/types/learnQuestionTypes';

const learnQuestionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		learnQuestion: build.mutation<LearnQuestionResponse, LearnQuestionParams>({
			query: (body) => ({
				url: `/interview-preparation`,
				method: 'PUT',
				body,
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
					toast.success(i18n.t(Translation.TOAST_QUESTIONS_LEARNED_SUCCESS));
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_QUESTIONS_LEARNED_FAILED));
					// eslint-disable-next-line no-console
					console.log(error);
				}
			},
		}),
	}),
});

export const { useLearnQuestionMutation } = learnQuestionApi;
