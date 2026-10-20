import { i18n, Translation, ApiTags, baseApi } from '@/shared/config';
import { route, handleApiError } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { TestQuestion } from '@/entities/testQuestion';

import { getDeleteTestQuestionApiErrorMessage } from '../lib/utils/getDeleteTestQuestionApiErrorMessage';
import { deleteTestQuestionApiUrls } from '../model/constants/deleteTestQuestionConstants';

const deleteTestQuestionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		deleteTestQuestion: build.mutation<void, TestQuestion['id']>({
			query: (testQuestionId) => ({
				url: route(deleteTestQuestionApiUrls.deleteTestQuestion, testQuestionId),
				method: 'DELETE',
			}),
			invalidatesTags: [ApiTags.TEST_QUESTIONS],
			async onQueryStarted(_, { queryFulfilled }) {
				try {
					await queryFulfilled;
					toast.success(i18n.t(Translation.TOAST_TEST_QUESTIONS_DELETE_SINGLE_SUCCESS));
				} catch (error) {
					toast.error(i18n.t(handleApiError(error, getDeleteTestQuestionApiErrorMessage)));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
		}),
	}),
});

export const { useDeleteTestQuestionMutation } = deleteTestQuestionApi;
