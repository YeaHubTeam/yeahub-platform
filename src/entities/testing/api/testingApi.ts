import { baseApi } from '@/shared/config';
import { route } from '@/shared/libs';

import { testingApiUrls } from '../model/constants/testingConstants';
import { GetActiveTestResponse, ActiveTest } from '../model/types/testing';

const testingApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getActiveTest: build.query<
			ActiveTest | undefined,
			{ profileId: string; page: number; limit: number }
		>({
			query: ({ profileId, ...params }) => ({
				url: route(testingApiUrls.getActiveTest, profileId),
				params,
			}),
			transformResponse(response: GetActiveTestResponse) {
				return response.data[0];
			},
		}),
	}),
	overrideExisting: true,
});

export const { useGetActiveTestQuery } = testingApi;
