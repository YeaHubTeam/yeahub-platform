import { http, HttpResponse } from 'msw';

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
		return HttpResponse.json(
			{
				message: 'auth.auth.unauthorized',
				statusCode: 401,
				description: 'Authentication failed',
			},
			{ status: 401 },
		);
	}
	if (!profileMockResponse.isVerified) {
		return HttpResponse.json(
			{
				message: 'auth.user.verified',
				statusCode: 403,
				description: 'Route is available for verified users!',
			},
			{ status: 403 },
		);
	}

	if (!profileMockResponse.userRoles.some((role) => listAdminRoles.includes(role.name))) {
		return HttpResponse.json(
			{
				message: 'auth.roles.admin_or_author_required',
				statusCode: 403,
				description: 'Admin or author required',
			},
			{ status: 403 },
		);
	}

	const topic: CreateTopicBodyRequest = await request.json();

	if (topicsMocks.data.some((t) => t.title === topic.title && t.skill.id === topic.skillId)) {
		return HttpResponse.json(
			{
				message: 'topic.topic.title.conflict',
				statusCode: 409,
				description: 'A topic with the same title already exists for this skill',
			},
			{ status: 409 },
		);
	}

	const date = new Date().toISOString();

	const response: CreateTopicResponse = {
		id: Date.now(),
		title: topic.title,
		description: topic.description,
		imageSrc: null,
		createdAt: date,
		updatedAt: date,
		skill: skillsMock.find((skill) => skill.id === topic.skillId) ?? {
			id: topic.skillId,
			title: '',
			description: '',
			imageSrc: null,
			createdAt: date,
			updatedAt: date,
			specializations: [],
			createdBy: { id: '', username: '' },
		},
	};

	topicsMocks.data.push(response);
	return HttpResponse.json(response);
});
