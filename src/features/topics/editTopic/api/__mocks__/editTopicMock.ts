import { http, HttpResponse, PathParams } from 'msw';

import { getMockAuthProfile } from '@/entities/auth';
import { topicsMocks } from '@/entities/topic';

import { editTopicApiUrls } from '../../model/constants/editTopicConstants';
import { TopicEditError } from '../../model/types/topicEditErrorTypes';
import { EditTopicBodyRequest, EditTopicResponse } from '../../model/types/topicEditTypes';

export const editTopicMock = http.patch<
	PathParams,
	EditTopicBodyRequest,
	EditTopicResponse | ApiErrorData<TopicEditError>
>(process.env.API_URL + editTopicApiUrls.editTopic, async ({ request }) => {
	const formData = await request.json();

	const topicIndex = topicsMocks.data.findIndex((topic) => topic.id === formData.id);

	const profileMockResponse = getMockAuthProfile(request);

	const isAdmin = profileMockResponse?.userRoles.some((role) => role.name === 'admin') ?? false;
	const isAuthor = profileMockResponse?.userRoles.some((role) => role.name === 'author') ?? false;
	const isAuthorOfThisTopic =
		topicsMocks.data[topicIndex].createdBy?.id === profileMockResponse?.id;

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

	if (!isAdmin && !(isAuthor && isAuthorOfThisTopic)) {
		return HttpResponse.json(
			{
				message: 'auth.roles.author_can_change_only_own',
				statusCode: 403,
				description: 'Author can change only own data',
			},
			{ status: 403 },
		);
	}

	if (topicsMocks.data[topicIndex].title === formData.title) {
		return HttpResponse.json(
			{
				message: 'topic.topic.title.conflict',
				statusCode: 409,
				description: 'A skill with the same title already exists',
			},
			{ status: 409 },
		);
	}

	if (topicIndex !== -1) {
		const updateTopic = {
			...topicsMocks.data[topicIndex],
			...formData,
			updatedAt: new Date().toISOString(),
		};

		topicsMocks.data[topicIndex] = updateTopic;

		return HttpResponse.json(updateTopic);
	}

	if (topicIndex === -1) {
		return HttpResponse.json(
			{ message: 'topic.topic.not_found', statusCode: 404, description: 'Topic not found' },
			{ status: 404 },
		);
	}
});
