import { http, HttpResponse, PathParams } from 'msw';

import { getMockAuthProfile } from '@/entities/auth';
import { topicsMocks } from '@/entities/topic';

import { editTopicApiUrls } from '../../model/constants/editTopicConstants';
import { TopicEditError } from '../../model/types/topicEditErrorTypes';
import { EditTopicBodyRequest, EditTopicResponse } from '../../model/types/topicEditTypes';

export const editQuestionMock = http.patch<
	PathParams,
	EditTopicBodyRequest,
	EditTopicResponse | ApiErrorData<TopicEditError>
>(process.env.API_URL + editTopicApiUrls.editTopic, async ({ request }) => {
	const formData = await request.json();

	const topicId = topicsMocks.data.findIndex((topic) => topic.id === formData.id);

	const profileMockResponse = getMockAuthProfile(request);

	const isAdmin = profileMockResponse?.userRoles.some((role) => role.name === 'admin') ?? false;
	const isAuthor = profileMockResponse?.userRoles.some((role) => role.name === 'author') ?? false;

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

	if (!isAdmin && !isAuthor) {
		return HttpResponse.json(
			{
				message: 'auth.roles.admin_or_author_required',
				statusCode: 403,
				description: 'Admin or author required',
			},
			{ status: 403 },
		);
	}

	if (topicsMocks.data[topicId].title === formData.title) {
		return HttpResponse.json(
			{
				message: 'topic.topic.title.conflict',
				statusCode: 409,
				description: 'A skill with the same title already exists',
			},
			{ status: 409 },
		);
	}

	if (topicId === -1) {
		return HttpResponse.json(
			{ message: 'topic.topic.not_found', statusCode: 404, description: 'Topic not found' },
			{ status: 404 },
		);
	}

	if (topicId !== -1) {
		const updateTopic = {
			...topicsMocks.data[topicId],
			...formData,
			updatedAt: new Date().toISOString(),
		};

		topicsMocks.data[topicId] = updateTopic;

		return HttpResponse.json(updateTopic);
	}
});
