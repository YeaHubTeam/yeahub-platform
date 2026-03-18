import { http, HttpResponse, PathParams } from 'msw';

import { topicsMocks } from '@/entities/topic';

import { editTopicApiUrls } from '../../model/constants/editTopicConstants';
import { EditTopicBodyRequest, EditTopicResponse } from '../../model/types/topicEditTypes';

export const editQuestionMock = http.patch<
	PathParams,
	EditTopicBodyRequest,
	EditTopicResponse | { error: string }
>(process.env.API_URL + editTopicApiUrls.editTopic, async ({ request }) => {
	const formData = await request.json();

	const topicId = topicsMocks.data.findIndex((topic) => topic.id === formData.id);

	if (topicId !== -1) {
		const updateTopic = {
			...topicsMocks.data[topicId],
			...formData,
			updatedAt: new Date().toISOString(),
		};

		topicsMocks.data[topicId] = updateTopic;

		return HttpResponse.json(updateTopic);
	}

	return HttpResponse.json({ error: 'Topic not found' }, { status: 404 });
});
