import { http, HttpResponse } from 'msw';

import { skillsMock } from '@/entities/skill';
import { topicsMocks } from '@/entities/topic';

import { createTopicApiUrls } from '../../model/constants/createTopicConstants';
import { CreateTopicBodyRequest, CreateTopicResponse } from '../../model/types/topicCreateTypes';

export const createTopicMock = http.post<never, CreateTopicBodyRequest, CreateTopicResponse>(
	process.env.API_URL + createTopicApiUrls.createTopic,
	async ({ request }) => {
		const topic: CreateTopicBodyRequest = await request.json();

		const response: CreateTopicResponse = {
			id: Date.now(),
			title: topic.title,
			description: topic.description,
			imageSrc: null,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			skill: skillsMock.data.find((skill) => skill.id === topic.skillId) ?? {
				id: topic.skillId,
				title: '',
				description: '',
				imageSrc: null,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			},
		};

		topicsMocks.data.push(response);
		return HttpResponse.json(response);
	},
);
