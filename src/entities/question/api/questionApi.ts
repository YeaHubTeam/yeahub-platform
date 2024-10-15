import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { Response } from '@/shared/types/types';

import {
	QuestionAdmin,
	Question,
	QuestionsListParams,
	QuestionsLearnedParams,
	QuestionByIdParams,
	QuestionsAdminListParams,
} from '../model/types/question';

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
				url: `/questions/${questionId}`,
				params: {
					profileId,
				},
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

const questionAdminApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getAdminQuestionsList: build.query<Response<QuestionAdmin[]>, QuestionsAdminListParams>({
			query: (params) => ({
				url: '/questions',
				params,
			}),
			providesTags: [ApiTags.QUESTIONS],
		}),
		getAdminQuestionById: build.query<Question, string>({
			query: (questionId) => ({
				url: `/questions/${questionId}`,
			}),
			providesTags: [ApiTags.QUESTION_DETAIL],
		}),
	}),
});

export const { useGetAdminQuestionsListQuery, useGetAdminQuestionByIdQuery } = questionAdminApi;
