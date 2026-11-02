import { i18n, i18Namespace, TestCreate, baseApi, ApiTags } from '@/shared/config';
import { route } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { testApiUrls } from '../model/constants/testConstants';
import { saveActiveTest } from '../model/helpers/saveActiveTest';
import {
	CreateNewTestParamsRequest,
	CreateNewTestResponse,
	GetTestHistoryParamsRequest,
	GetTestHistoryResponse,
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
		getHistoryTest: build.query<
			GetTestHistoryResponse,
			GetTestHistoryParamsRequest & { uniqueKey: string }
		>({
			query: ({ profileId, ...params }) => ({
				url: route(testApiUrls.getHistoryTest, profileId),
				params,
			}),
			serializeQueryArgs: ({ endpointName, queryArgs }) => {
				return endpointName + queryArgs.uniqueKey;
			},
			merge: (currentCache, newItems) => {
				return {
					...currentCache,
					data: [...(currentCache.data ?? []), ...newItems.data],
				};
			},
			forceRefetch({ currentArg, previousArg }) {
				return (
					currentArg?.uniqueKey !== previousArg?.uniqueKey ||
					JSON.stringify(currentArg) !== JSON.stringify(previousArg)
				);
			},
			providesTags: [ApiTags.HISTORY_TEST],
		}),
	}),
	overrideExisting: true,
});

export const { useLazyCreateNewTestQuery, useGetHistoryTestQuery } = testApi;
