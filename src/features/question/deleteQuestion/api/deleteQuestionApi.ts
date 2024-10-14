import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';

import { QuestionAdmin } from '@/entities/question';

const deleteQuestionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		deleteQuestion: build.mutation<QuestionAdmin, QuestionAdmin['id']>({
			query: (questionId) => ({
				url: `/questions/${questionId}`,
				method: 'DELETE',
			}),
			invalidatesTags: [ApiTags.QUESTIONS, ApiTags.QUESTION_DETAIL],
		}),
	}),
});

export const { useDeleteQuestionMutation } = deleteQuestionApi;
