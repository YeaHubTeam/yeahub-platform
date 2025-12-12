import { ApiTags, baseApi } from '@/shared/config';

import { topicApiUrl } from '../model/constants/topicConstants';
import {
	GetTopicsListParamsRequest,
	GetTopicsListResponse,
	GetTopicByIdParamsRequest,
	GetTopicByIdResponse,
} from '../model/types/topic';

export const topicApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getTopicsList: build.query<GetTopicsListResponse, GetTopicsListParamsRequest>({
			query: (params) => ({
				url: topicApiUrl.getTopicsList,
				params,
			}),
			providesTags: [ApiTags.TOPICS],
		}),
		getTopicById: build.query<GetTopicByIdResponse, GetTopicByIdParamsRequest>({
			query: (params) => ({
				url: topicApiUrl.getTopicById(params.topicId),
			}),
			providesTags: [ApiTags.TOPICS],
		}),
	}),
});

export const { useGetTopicsListQuery, useGetTopicByIdQuery } = topicApi;
