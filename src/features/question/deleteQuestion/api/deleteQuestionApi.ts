import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { handleRequestToast } from '@/shared/helpers/handleRequestToast';

import { Question } from '@/entities/question';

import { ExtraArgument } from '../model/types/questionDeleteTypes';

const deleteQuestionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		deleteQuestion: build.mutation<Question, Question['id']>({
			query: (questionId) => ({
				url: `/questions/${questionId}`,
				method: 'DELETE',
			}),
			invalidatesTags: [ApiTags.QUESTIONS, ApiTags.QUESTION_DETAIL],
			async onQueryStarted(_, { queryFulfilled, extra }) {
				const onSuccess = async () => {
					await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					typedExtra.navigate(ROUTES.admin.questions.page);
				};
				handleRequestToast({
					onSuccess,
					successMessage: Translation.TOAST_QUESTIONS_DELETE_SUCCESS,
					failedMessage: Translation.TOAST_QUESTIONS_DELETE_FAILED,
				});
			},
		}),
	}),
});

export const { useDeleteQuestionMutation } = deleteQuestionApi;
