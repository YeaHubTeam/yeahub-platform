import { http, HttpResponse } from 'msw';

import { topicApiUrl } from '../../model/constants/topicConstants';
import { CreateOrEditTopicFormValues, Topic } from '../../model/types/topic';

export const createTopicMock = http.post<never, CreateOrEditTopicFormValues, Topic>(
	process.env.API_URL + topicApiUrl.createTopic,
	async ({ request }) => {
		const topic: CreateOrEditTopicFormValues = await request.json();

		const response: Topic = {
			...topic,
			id: 1,
			skill: {
				id: topic.skillId,
				title: 'Тестовый навык',
				description: 'Описание навыка',
				imageSrc: null,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			},
		};

		return HttpResponse.json(response);
	},
);
