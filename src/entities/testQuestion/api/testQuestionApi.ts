import { ApiTags, baseApi } from '@/shared/config';
import { route } from '@/shared/libs';

import { testQuestionApiUrls } from '../model/constants/testQuestion';
import {
	GetTestQuestionKeywordsParamsRequest,
	GetTestQuestionKeywordsResponse,
} from '../model/types/testQuestion';

const testQuestionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getTestQuestionKeywords: build.query<
			GetTestQuestionKeywordsResponse,
			GetTestQuestionKeywordsParamsRequest
		>({
			query: (params) => ({
				url: route(testQuestionApiUrls.getTestQuestionKeywords),
				params,
			}),
			providesTags: [ApiTags.TEST_QUESTIONS],
		}),
	}),
});

export const { useGetTestQuestionKeywordsQuery } = testQuestionApi;
