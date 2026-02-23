import { ApiTags, baseApi } from '@/shared/config';
import { route } from '@/shared/libs';

import { Topic } from '@/entities/topic';

import { deleteTopicApiUrls } from '../model/deleteTopicConstants';

const deleteTopicMutation = baseApi.injectEndpoints({
	endpoints: (build) => ({
		deleteTopic: build.mutation<void, Topic['id']>({
			query: (topicId) => ({
				url: route(deleteTopicApiUrls.deleteTopic, topicId),
				method: 'DELETE',
			}),
			invalidatesTags: [ApiTags.TOPICS, ApiTags.TOPIC_DETAIL],
		}),
	}),
});

export const { useDeleteTopicMutation } = deleteTopicMutation;
