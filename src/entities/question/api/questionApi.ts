import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { Response } from '@/shared/types/types';

import { Question, QuestionsListParams, QuestionByIdParams } from '../model/types/question';

const questionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getQuestionsList: build.query<Response<Question[]>, QuestionsListParams>({
			query: (params) => ({
				url: '/questions',
				params,
			}),
			providesTags: [ApiTags.QUESTIONS],
		}),
		getQuestionById: build.query<Question, QuestionByIdParams>({
			query: ({ questionId, profileId }) => ({
				url: `/questions/${questionId}?profileId=${profileId}`,
			}),
			providesTags: [ApiTags.QUESTION_DETAIL],
		}),
	}),
});

export const { useGetQuestionsListQuery, useGetQuestionByIdQuery } = questionApi;
