import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { handleRequestToast } from '@/shared/helpers/handleRequestToast';

import { LearnQuestionParams, LearnQuestionResponse } from '../model/types/learnQuestionTypes';

const learnQuestionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		learnQuestion: build.mutation<LearnQuestionResponse, LearnQuestionParams>({
			query: (body) => ({
				url: `/interview-preparation`,
				method: 'PUT',
				body,
			}),
			invalidatesTags: [ApiTags.QUESTION_DETAIL, ApiTags.QUESTIONS],
			async onQueryStarted() {
				handleRequestToast({
					successMessage: Translation.TOAST_QUESTIONS_LEARNED_SUCCESS,
					failedMessage: Translation.TOAST_QUESTIONS_LEARNED_FAILED,
				});
			},
		}),
	}),
});

export const { useLearnQuestionMutation } = learnQuestionApi;
