import { ApiTags, baseApi } from '@/shared/config';

import { testQuestionApiUrls } from '../model/constants/testQuestionConstants';
import type {
	GetTestQuestionsListParamsRequest,
	GetTestQuestionsListResponse,
} from '../model/types/testQuestion';

const testQuestionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getTestQuestionsList: build.query<
			GetTestQuestionsListResponse,
			GetTestQuestionsListParamsRequest
		>({
			query: (params) => ({
				url: testQuestionApiUrls.getTestQuestionsList,
				params,
			}),
			providesTags: [ApiTags.TEST_QUESTIONS],
		}),
	}),
});

export const { useGetTestQuestionsListQuery } = testQuestionApi;
