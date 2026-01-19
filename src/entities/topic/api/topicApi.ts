import { ApiTags, baseApi } from '@/shared/config';
import { route } from '@/shared/libs';

import { topicApiUrl } from '../model/constants/topicConstants';
import {
	GetTopicsListParamsRequest,
	GetTopicsListResponse,
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
		getTopicById: build.query<GetTopicByIdResponse, string>({
			query: (topicId) => ({
				url: route(topicApiUrl.getTopicById, topicId || ''),
			}),
			providesTags: [ApiTags.TOPIC_DETAIL],
		}),
	}),
});

export const { useGetTopicsListQuery, useGetTopicByIdQuery } = topicApi;
