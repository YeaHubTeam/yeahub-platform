import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';

import { topicApiUrl } from '../model/constants/topicConstants';
import { GetTopicsListParamsRequest, GetTopicsListResponse } from '../model/types/topic';

export const topicApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getTopicsList: build.query<GetTopicsListResponse, GetTopicsListParamsRequest>({
			query: (params) => ({
				url: topicApiUrl.getTopicsList,
				params,
			}),
			providesTags: [ApiTags.TOPICS],
		}),
	}),
});

export const { useGetTopicsListQuery } = topicApi;
