import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { Response } from '@/shared/types/types';

import { Question, QuestionsListParams, QuestionsLearnedParams } from '../model/types/question';

const questionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getQuestionsList: build.query<Response<Question[]>, QuestionsListParams>({
			query: (params) => ({
				url: '/questions',
				params,
			}),
			providesTags: [ApiTags.QUESTIONS],
		}),
		getQuestionById: build.query<Question, string>({
			query: (questionId) => ({
				url: `/questions/${questionId}`,
			}),
			providesTags: [ApiTags.QUESTION_DETAIL],
		}),
		getLearnedQuestions: build.query<Response<Question[]>, QuestionsLearnedParams>({
			query: (params) => ({
				url: `/interview-preparation/learn/${params.profileId}`,
				params,
			}),
			providesTags: [ApiTags.QUESTIONS_LEARNED],
		}),
	}),
});

export const { useGetQuestionsListQuery, useGetQuestionByIdQuery, useGetLearnedQuestionsQuery } =
	questionApi;
