import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { toast } from '@/shared/ui/Toast';

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
				try {
					await queryFulfilled;
					const typedExtra = extra as ExtraArgument;
					toast.success(i18n.t(Translation.TOAST_QUESTIONS_DELETE_SINGLE_SUCCESS));
					typedExtra.navigate(ROUTES.admin.questions.page);
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_QUESTIONS_DELETE_SINGLE_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
		}),
	}),
});

export const { useDeleteQuestionMutation } = deleteQuestionApi;
