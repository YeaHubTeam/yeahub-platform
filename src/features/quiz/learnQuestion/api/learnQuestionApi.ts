import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Interview } from '@/shared/config/i18n/i18nTranslations';
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
			invalidatesTags: [ApiTags.QUESTION_DETAIL],
			async onQueryStarted() {
				try {
					toast.success(i18n.t(Interview.QUESTIONS_TOAST_QUESTIONISLEARNED));
				} catch (error) {
					toast.error(i18n.t(Interview.QUESTIONS_TOAST_QUESTIONISNOTLEARNED));
					// eslint-disable-next-line no-console
					console.log(error);
				}
			},
		}),
	}),
});

export const { useLearnQuestionMutation } = learnQuestionApi;
