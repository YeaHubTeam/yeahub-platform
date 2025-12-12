import { i18n, Translation, ApiTags, baseApi, ROUTES, ExtraArgument } from '@/shared/config';
import { route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { Question } from '@/entities/question';

import { deleteQuestionApiUrls } from '../model/constants/deleteQuestionConstants';

const deleteQuestionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		deleteQuestion: build.mutation<void, Question['id']>({
			query: (questionId) => ({
				url: route(deleteQuestionApiUrls.deleteQuestion, questionId),
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
