import { i18n, i18Namespace, TestCreate, baseApi } from '@/shared/config';
import { route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { testApiUrls } from '../model/constants/testConstants';
import { saveActiveTest } from '../model/helpers/saveActiveTest';
import {
	CreateNewTestParamsRequest,
	CreateNewTestResponse,
	GetFinishedTestDataResponse,
} from '../model/types/testTypes';

const testApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createNewTest: build.query<CreateNewTestResponse, CreateNewTestParamsRequest>({
			query: ({ profileId, ...params }) => ({
				url: route(testApiUrls.createNewTest, profileId),
				params,
			}),
			async onQueryStarted({ profileId }, { queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;

					saveActiveTest(profileId, data.response.answers);
					toast.success(i18n.t(TestCreate.CREATE_SUCCESS, { ns: i18Namespace.testCreate }));
				} catch (error) {
					toast.error(i18n.t(TestCreate.CREATE_ERROR, { ns: i18Namespace.testCreate }));
					// eslint-disable-next-line no-console
					console.error(error);
				}
			},
		}),
		getFinishedTestData: build.query<
			GetFinishedTestDataResponse,
			{ profileId: string; testId: string }
		>({
			query: ({ profileId, testId }) => ({
				url: route(testApiUrls.getFinishedTestData, profileId, testId),
			}),
		}),
	}),
	overrideExisting: true,
});

export const { useLazyCreateNewTestQuery, useGetFinishedTestDataQuery } = testApi;
