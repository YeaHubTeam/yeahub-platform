import { baseApi } from '@/shared/config/api/baseApi';

import { Question } from '@/entities/question';

export const deleteQuestionsApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		deleteQuestionWithoutErrorHandler: build.mutation<Question, Question['id']>({
			query: (questionId) => ({
				url: `/questions/${questionId}`,
				method: 'DELETE',
			}),
		}),
	}),
});
