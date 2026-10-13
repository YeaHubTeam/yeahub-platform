import { baseApi } from '@/shared/config';

import type {
	GetTestQuestionsParamsRequest,
	GetTestQuestionsResponse,
} from '@/entities/testQuestion';

import { testQuestionApiUrls } from '../model/constants/testQuestion';

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
		}),
	}),
});

export const { useGetTestQuestionsListQuery } = testQuestionApi;
