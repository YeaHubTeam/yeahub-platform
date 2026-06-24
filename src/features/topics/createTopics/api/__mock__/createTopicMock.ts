import { http, HttpResponse } from 'msw';

import { createErrorResponse } from '@/shared/libs';

import { getMockAuthProfile, listAdminRoles } from '@/entities/auth';
import { skillsMock } from '@/entities/skill';
import { topicsMocks } from '@/entities/topic';

import { createTopicApiUrls } from '../../model/constants/createTopicConstants';
import { TopicCreateError } from '../../model/types/topicCreateErrorTypes';
import { CreateTopicBodyRequest, CreateTopicResponse } from '../../model/types/topicCreateTypes';

export const createTopicMock = http.post<
	never,
	CreateTopicBodyRequest,
	CreateTopicResponse | ApiErrorData<TopicCreateError>
>(process.env.API_URL + createTopicApiUrls.createTopic, async ({ request }) => {
	const profileMockResponse = getMockAuthProfile(request);

	if (!profileMockResponse) {
		const { error, option } = createErrorResponse<TopicCreateError>(
			'auth.auth.unauthorized',
			401,
			'Authentication failed',
		);
		return HttpResponse.json(error, option);
	}
	if (!profileMockResponse.isVerified) {
		const { error, option } = createErrorResponse<TopicCreateError>(
			'auth.user.verified',
			403,
			'Route is available for verified users!',
		);
		return HttpResponse.json(error, option);
	}

	if (!profileMockResponse.userRoles.some((role) => listAdminRoles.includes(role.name))) {
		const { error, option } = createErrorResponse<TopicCreateError>(
			'auth.roles.admin_or_author_required',
			403,
			'Admin or author required',
		);
		return HttpResponse.json(error, option);
	}

	const topic: CreateTopicBodyRequest = await request.json();

	if (topicsMocks.data.some((t) => t.title === topic.title)) {
		const { error, option } = createErrorResponse<TopicCreateError>(
			'topic.topic.title.conflict',
			409,
			'A topic with the same title already exists for this skill',
		);
		return HttpResponse.json(error, option);
	}

	const date = new Date().toISOString();

	const response: CreateTopicResponse = {
		id: Date.now(),
		title: topic.title,
		description: topic.description,
		imageSrc: null,
		createdAt: date,
		updatedAt: date,
		skill: skillsMock.data.find((skill) => skill.id === topic.skillId) ?? {
			id: topic.skillId,
			title: '',
			description: '',
			imageSrc: null,
			createdAt: date,
			updatedAt: date,
		},
	};

	topicsMocks.data.push(response);
	return HttpResponse.json(response);
});
