import { ApiTags, baseApi } from '@/shared/config';
import { route } from '@/shared/libs';

import { testQuestionApiUrls } from '../model/constants/testQuestion';
import {
	GetTestQuestionKeywordsParamsRequest,
	GetTestQuestionKeywordsResponse,
	GetTestQuestionsParamsRequest,
	GetTestQuestionsResponse,
	GetTestQuestionByIdResponse,
	GetTestQuestionByIdParamsRequest,
} from '../model/types/testQuestion';

const testQuestionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getTestQuestionsList: build.query<GetTestQuestionsResponse, GetTestQuestionsParamsRequest>({
			query: (params) => ({
				url: testQuestionApiUrls.getTestQuestionsList,
				params: {
					page: 1,
					limit: 10,
					order: 'ASC',
					...params,
				},
			}),
			providesTags: [ApiTags.TEST_QUESTIONS],
		}),
		getTestQuestionKeywords: build.query<
			GetTestQuestionKeywordsResponse,
			GetTestQuestionKeywordsParamsRequest
		>({
			query: (params) => ({
				url: testQuestionApiUrls.getTestQuestionKeywords,
				params,
			}),
			providesTags: [ApiTags.TEST_QUESTIONS],
		}),
		getTestQuestionById: build.query<GetTestQuestionByIdResponse, GetTestQuestionByIdParamsRequest>(
			{
				query: ({ testQuestionId, profileId }) => ({
					url: route(testQuestionApiUrls.getTestQuestionById, testQuestionId || ''),
					params: {
						profileId,
					},
				}),
				providesTags: [ApiTags.TEST_QUESTION_DETAIL],
			},
		),
	}),
});

export const {
	useGetTestQuestionsListQuery,
	useGetTestQuestionKeywordsQuery,
	useGetTestQuestionByIdQuery,
} = testQuestionApi;
