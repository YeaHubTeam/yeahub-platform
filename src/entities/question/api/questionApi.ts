import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { route } from '@/shared/helpers/route';

import {
	GetLearnedQuestionsParamsRequest,
	GetLearnedQuestionsResponse,
} from '@/entities/question/model/types/learnedQuestion';

import { questionApiUrls } from '../model/constants/question';
import {
	GetQuestionsForLearnParamsRequest,
	GetQuestionsForLearnResponse,
	GetQuestionByIdParamsRequest,
	GetQuestionByIdResponse,
	GetQuestionsListParamsRequest,
	GetQuestionsListResponse,
	GetPublicQuestionByIdResponse,
	GetPublicQuestionByIdParamsRequest,
	GetQuestionsBySpecializationCountResponse,
} from '../model/types/question';

const questionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getQuestionsList: build.query<GetQuestionsListResponse, GetQuestionsListParamsRequest>({
			query: (params) => ({
				url: questionApiUrls.getQuestionsList,
				params: { page: 1, limit: 10, skillFilterMode: 'ANY', ...params },
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
		getQuestionsForLearn: build.query<
			GetQuestionsForLearnResponse,
			GetQuestionsForLearnParamsRequest
		>({
			query: (params) => ({
				url: route(questionApiUrls.getQuestionsForLearn, params.profileId),
				params,
			}),
			providesTags: [ApiTags.QUESTIONS_LEARN],
		}),
		getPublicQuestionsList: build.query<GetQuestionsListResponse, GetQuestionsListParamsRequest>({
			query: (params) => ({
				url: questionApiUrls.getPublicQuestionsList,
				params: { page: 1, limit: 10, skillFilterMode: 'ANY', ...params },
			}),
			providesTags: [ApiTags.QUESTIONS],
		}),
		getPublicQuestionById: build.query<
			GetPublicQuestionByIdResponse,
			GetPublicQuestionByIdParamsRequest
		>({
			query: ({ questionId }) => ({
				url: route(questionApiUrls.getPublicQuestionById, questionId || ''),
			}),
			providesTags: [ApiTags.PUBLIC_QUESTION_DETAIL],
		}),
		getQuestionsSpecializationByIdCount: build.query<
			GetQuestionsBySpecializationCountResponse,
			number
		>({
			query: (specializationId) =>
				route(questionApiUrls.getStatisticsQuestionsSpecializationById, specializationId),
			providesTags: [ApiTags.QUESTION_STATISTICS],
		}),
		getLearnedQuestions: build.query<GetLearnedQuestionsResponse, GetLearnedQuestionsParamsRequest>(
			{
				query: (params) => ({
					url: questionApiUrls.getLearnedQuestions,
					params,
				}),
				providesTags: [ApiTags.QUESTIONS_LEARNED],
			},
		),
	}),
});

export const {
	useGetQuestionsListQuery,
	useGetQuestionByIdQuery,
	useGetQuestionsForLearnQuery,
	useGetPublicQuestionsListQuery,
	useGetPublicQuestionByIdQuery,
	useGetQuestionsSpecializationByIdCountQuery,
	useGetLearnedQuestionsQuery,
} = questionApi;
