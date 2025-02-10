import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';

import { collectionApiUrls } from '../model/constants/collection';
import {
	GetCollectionsListParamsRequest,
	GetCollectionsListResponse,
} from '../model/types/collection';

interface CustomGetCollectionsListParamsRequest extends GetCollectionsListParamsRequest {
	isFree?: boolean;
}

const collectionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getCollectionsList: build.query<
			GetCollectionsListResponse,
			CustomGetCollectionsListParamsRequest
		>({
			query: (params) => {
				const queryParams: GetCollectionsListParamsRequest & { isFree?: boolean } = { ...params };
				console.log('QueryParams перед отправкой запроса:', queryParams);

				return {
					url: collectionApiUrls.getCollectionsList,
					params: queryParams,
				};
			},
			providesTags: [ApiTags.COLLECTIONS],
		}),
	}),
});

export const { useGetCollectionsListQuery } = collectionApi;
