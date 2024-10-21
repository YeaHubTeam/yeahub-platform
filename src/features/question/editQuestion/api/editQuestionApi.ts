import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';

import { Question } from '@/entities/question';

import { QuestionEditFormValues } from '../model/types/questionEditPageTypes';

const editQuestionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		editQuestion: build.mutation<Question, QuestionEditFormValues>({
			query: (question) => ({
				url: `/questions/${question.id}`,
				method: 'PATCH',
				body: question,
			}),
			invalidatesTags: [ApiTags.QUESTIONS, ApiTags.QUESTION_DETAIL],
		}),
	}),
});

export const { useEditQuestionMutation } = editQuestionApi;
