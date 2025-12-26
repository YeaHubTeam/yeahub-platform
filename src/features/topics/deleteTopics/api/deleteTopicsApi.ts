import { baseApi } from '@/shared/config';
import { route } from '@/shared/libs';

import { deleteTopicsApiUrls } from '../model/constants/deleteTopicsConstants';

export const deleteTopicsApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		deleteTopicOfMultiply: build.mutation<void, number>({
			query: (topicId) => ({
				url: route(deleteTopicsApiUrls.deleteTopic, topicId),
				method: 'DELETE',
			}),
		}),
	}),
});
