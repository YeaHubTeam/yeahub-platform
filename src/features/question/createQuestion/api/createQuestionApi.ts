import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';

import { Question } from '@/entities/question';

import { QuestionCreateFormValues } from '../model/types/questionCreatePageTypes';

export const createQuestionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createQuestion: build.mutation<Question, QuestionCreateFormValues>({
			query: (question) => ({
				url: `/questions`,
				method: 'POST',
				body: question,
			}),
			invalidatesTags: [ApiTags.QUESTIONS],
		}),
	}),
});

export const { useCreateQuestionMutation } = createQuestionApi;
