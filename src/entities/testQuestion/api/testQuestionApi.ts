import { ApiTags, baseApi } from '@/shared/config';
import { route } from '@/shared/libs';

import { testQuestionApiUrls } from '../model/constants/testQuestion';
import { TestQuestion } from '../model/types/testQuestion';

const testQuestionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getTestQuestionById: build.query<TestQuestion, number>({
			query: (testQuestionId) => ({
				url: route(testQuestionApiUrls.getTestQuestionById, testQuestionId),
			}),
			providesTags: (_result, _error, id) => [{ type: ApiTags.TEST_QUESTION_DETAIL, id }],
		}),
	}),
});

export const { useGetTestQuestionByIdQuery } = testQuestionApi;
