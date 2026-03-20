import { i18n, Translation, ApiTags, baseApi } from '@/shared/config';
import { handleApiError } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { getCreateMultipleQuestionsApiErrorMessage } from '../lib/utils/getCreateMultipleQuestionsApiErrorMessage';
import {
	createMultipleQuestionsApiUrls,
	GENERATED_QUESTIONS_LS_KEY,
} from '../model/constants/createMultipleQuestionsConstants';
import {
	CreateMultipleQuestionsBodyRequest,
	CreateMultipleQuestionsResponse,
} from '../model/types/createMultipleQuestionsTypes';

export const createMultipleQuestionsApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createMultipleQuestions: build.mutation<
			CreateMultipleQuestionsResponse,
			CreateMultipleQuestionsBodyRequest
		>({
			query: (body) => ({
				url: createMultipleQuestionsApiUrls.createMultipleQuestions,
				method: 'POST',
				body,
			}),
			async onQueryStarted(_, { queryFulfilled }) {
				try {
					const result = await queryFulfilled;

					localStorage.setItem(GENERATED_QUESTIONS_LS_KEY, JSON.stringify(result.data));

					toast.success(i18n.t(Translation.TOAST_QUESTIONS_CREATE_MULTIPLE_SUCCESS));
				} catch (error) {
					toast.error(i18n.t(handleApiError(error, getCreateMultipleQuestionsApiErrorMessage)));
				}
			},
			invalidatesTags: [ApiTags.QUESTIONS],
		}),
	}),
});

export const { useCreateMultipleQuestionsMutation } = createMultipleQuestionsApi;
