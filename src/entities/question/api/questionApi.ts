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
		getLearnedQuestions: build.query<GetLearnedQuestionsResponse, GetLearnedQuestionsParamsRequest>(
			{
				query: (params) => ({
					url: route(questionApiUrls.getLearnedQuestions, params.profileId),
					params,
				}),
				providesTags: [ApiTags.QUESTIONS_LEARNED],
			},
		),
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
			string
		>({
			query: (specializationId) =>
				route(questionApiUrls.getStatisticsQuestionsSpecializationById, specializationId),
			providesTags: [ApiTags.QUESTION_STATISTICS],
		}),
	}),
});

export const {
	useGetQuestionsListQuery,
	useGetQuestionByIdQuery,
	useGetLearnedQuestionsQuery,
	useGetPublicQuestionsListQuery,
	useGetPublicQuestionByIdQuery,
	useGetQuestionsSpecializationByIdCountQuery,
} = questionApi;
