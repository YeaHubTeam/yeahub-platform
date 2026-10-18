import { i18n, Translation, ApiTags, baseApi, ExtraArgument, ROUTES } from '@/shared/config';
import { route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { editTestQuestionApiUrls } from '../model/constants/editTestQuestionConstants';
import {
	EditTestQuestionBodyRequest,
	EditTestQuestionResponse,
} from '../model/types/testQuestionEditTypes';

const editTestQuestionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		editTestQuestion: build.mutation<EditTestQuestionResponse, EditTestQuestionBodyRequest>({
			query: (testQuestion) => ({
				url: route(editTestQuestionApiUrls.editTestQuestion, testQuestion.id),
				method: 'PATCH',
				body: testQuestion,
			}),
			async onQueryStarted(_, { queryFulfilled, extra }) {
				try {
					const result = await queryFulfilled;
					const typedExtra = extra as ExtraArgument;

					typedExtra.navigate(route(ROUTES.admin.testQuestions.details.page, result.data.id));

					toast.success(i18n.t(Translation.TOAST_TEST_QUESTION_EDIT_SUCCESS));
				} catch (error) {
					toast.error(i18n.t(Translation.TOAST_TEST_QUESTION_EDIT_FAILED));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
			invalidatesTags: [ApiTags.TEST_QUESTIONS, ApiTags.TEST_QUESTION_DETAIL],
		}),
	}),
});

export const { useEditTestQuestionMutation } = editTestQuestionApi;
