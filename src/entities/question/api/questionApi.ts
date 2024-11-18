import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { Response } from '@/shared/types/types';

import { questionApiUrls } from '../model/constants/question';
import {
	Question,
	QuestionsListParams,
	QuestionsLearnedParams,
	QuestionByIdParams,
} from '../model/types/question';

const questionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getQuestionsList: build.query<Response<Question[]>, QuestionsListParams>({
			query: (params) => ({
				url: questionApiUrls.questions,
				params: { ...params, limit: 10 },
			}),
			providesTags: [ApiTags.QUESTIONS],
		}),
		getQuestionById: build.query<Question, QuestionByIdParams>({
			query: ({ questionId, profileId }) => ({
				url: `${questionApiUrls.questions}/${questionId}`,
				params: {
					profileId,
				},
			}),
			providesTags: [ApiTags.QUESTION_DETAIL],
		}),
		getLearnedQuestions: build.query<Response<Question[]>, QuestionsLearnedParams>({
			query: (params) => ({
				url: `interview-preparation/learn/${params.profileId}`,
				params,
			}),
			providesTags: [ApiTags.QUESTIONS_LEARNED],
		}),
	}),
});

export const { useGetQuestionsListQuery, useGetQuestionByIdQuery, useGetLearnedQuestionsQuery } =
	questionApi;
