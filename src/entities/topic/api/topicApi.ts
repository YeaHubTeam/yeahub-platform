import { ApiTags, baseApi } from '@/shared/config';
import { route } from '@/shared/libs';

import { topicApiUrls } from '../model/constants/topicConstants';
import {
	GetTopicsListResponse,
	GetTopicsListParamsRequest,
	GetTopicByIdResponse,
	GetTopicByIdParamsRequest,
} from '../model/types/topic';

export const topicApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getTopicsList: build.query<GetTopicsListResponse, GetTopicsListParamsRequest>({
			query: (params) => ({
				url: topicApiUrls.getTopicsList,
				params,
			}),
			providesTags: [ApiTags.TOPICS],
		}),
		getTopicById: build.query<GetTopicByIdResponse, GetTopicByIdParamsRequest>({
			query: ({ topicId }) => ({
				url: route(topicApiUrls.getTopicById, topicId || ''),
			}),
			providesTags: [ApiTags.TOPICS],
		}),
	}),
});

export const { useGetTopicsListQuery, useGetTopicByIdQuery } = topicApi;
