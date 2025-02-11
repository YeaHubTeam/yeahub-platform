import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';

import {
	GetCollectionsListParamsRequest,
	GetCollectionsListResponse,
} from '../model/types/collection';

const collectionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getCollectionsList: build.query<GetCollectionsListResponse, GetCollectionsListParamsRequest>({
			query: (params) => ({
				url: collectionApiUrls.getCollectionsList,
				params: { page: 1, limit: 10, ...params },
			}),
			providesTags: [ApiTags.COLLECTIONS],
		}),
	}),
});
export const { useGetCollectionsListQuery } = collectionApi;
