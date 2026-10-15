import { ApiTags, baseApi } from '@/shared/config';

import { testQuestionApiUrls } from '../model/constants/testQuestion';
import {
	GetTestQuestionKeywordsParamsRequest,
	GetTestQuestionKeywordsResponse,
	GetTestQuestionsParamsRequest,
	GetTestQuestionsResponse,
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
	}),
});

export const { useGetTestQuestionsListQuery, useGetTestQuestionKeywordsQuery } = testQuestionApi;
