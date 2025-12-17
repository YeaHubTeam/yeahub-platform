import { ApiTags, baseApi } from '@/shared/config';
import { route } from '@/shared/libs';

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
				url: route(topicApiUrl.getTopicById, params.topicId),
			}),
			providesTags: [ApiTags.TOPIC],
		}),
	}),
});

export const { useGetTopicsListQuery, useGetTopicByIdQuery } = topicApi;
