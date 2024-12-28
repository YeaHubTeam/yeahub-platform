import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { route } from '@/shared/helpers/route';

import { questionApiUrls } from '../model/constants/question';
import {
	GetLearnedQuestionsParamsRequest,
	GetLearnedQuestionsResponse,
	GetQuestionByIdParamsRequest,
	GetQuestionByIdResponse,
	GetQuestionsListParamsRequest,
	GetQuestionsListResponse,
	GetPublicQuestionByIdResponse,
	GetPublicQuestionByIdParamsRequest,
} from '../model/types/question';

const questionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getQuestionsList: build.query<GetQuestionsListResponse, GetQuestionsListParamsRequest>({
			query: (params) => ({
				url: questionApiUrls.getQuestionsList,
				params: { page: 1, limit: 10, ...params },
			}),
			providesTags: [ApiTags.QUESTIONS],
		}),
		getQuestionById: build.query<GetQuestionByIdResponse, GetQuestionByIdParamsRequest>({
			query: ({ questionId, profileId }) => ({
				url: route(questionApiUrls.getQuestionById, questionId || ''),
				params: {
					profileId,
				},
			}),
			providesTags: [ApiTags.QUESTION_DETAIL],
		}),
		getLearnedQuestions: build.query<GetLearnedQuestionsResponse, GetLearnedQuestionsParamsRequest>(
			{
				query: (params) => ({
					url: route(questionApiUrls.getLearnedQuestions, params.profileId),
					params,
				}),
				providesTags: [ApiTags.QUESTIONS_LEARNED],
			},
		),
		getPublicQuestionById: build.query<
			GetPublicQuestionByIdResponse,
			GetPublicQuestionByIdParamsRequest
		>({
			query: ({ questionId }) => ({
				url: route(questionApiUrls.getPublicQuestionById, questionId || ''),
			}),
			providesTags: [ApiTags.PUBLIC_QUESTION_DETAIL],
		}),
	}),
});

export const {
	useGetQuestionsListQuery,
	useGetQuestionByIdQuery,
	useGetLearnedQuestionsQuery,
	useGetPublicQuestionByIdQuery,
} = questionApi;
