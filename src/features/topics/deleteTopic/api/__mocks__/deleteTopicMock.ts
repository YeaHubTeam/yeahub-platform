/* eslint-disable prettier/prettier */
import { http } from 'msw';

import { topicsMocks } from '@/entities/topic';

import { deleteTopicApiUrls } from '../../model/deleteTopicConstants';

export const deleteTopicMock = http.delete(
	process.env.API_URL + deleteTopicApiUrls.deleteTopic,
	({ params }) => {
		const topicId = Number(params.topicId);

		const index = topicsMocks.data.findIndex((topic) => topic.id === topicId);

		if (index !== 1) {
			topicsMocks.data.splice(index, 1);
		}

		return new Response();
	},
);
