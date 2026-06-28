import { DefaultBodyType, http, HttpResponse } from 'msw';

import { getMockAuthProfile } from '@/entities/auth';
import { questionsMock } from '@/entities/question';
import { topicsMocks } from '@/entities/topic';

import { deleteTopicApiUrls } from '../../model/constants/deleteTopicConstants';
import { DeleteTopicError } from '../../model/types/deleteTopicTypes';

export const deleteTopicMock = http.delete<
	{ topicId: string },
	DefaultBodyType,
	ApiErrorData<DeleteTopicError>
>(process.env.API_URL + deleteTopicApiUrls.deleteTopic, ({ params, request }) => {
	const topicId = Number(params.topicId);

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

	const currentTopic = topicsMocks.data.find((topic) => topic.id === topicId);

	if (!currentTopic) {
		return HttpResponse.json(
			{
				message: 'topic.topic.not_found',
				statusCode: 404,
				description: 'Topic no found',
			},
			{ status: 404 },
		);
	}

	const isAdmin = profileMockResponse.userRoles.some((role) => role.name === 'admin');

	const isAuthor = currentTopic.createdBy?.id === profileMockResponse.id;

	if (!isAdmin && !isAuthor) {
		return HttpResponse.json(
			{
				message: 'auth.roles.author_can_change_only_own',
				statusCode: 403,
				description: 'Author can change only own data',
			},
			{ status: 403 },
		);
	}

	const hasQuestionWithTopic = questionsMock.data.some((question) =>
		question.questionTopics?.some((topic) => topic.id === topicId),
	);

	if (hasQuestionWithTopic) {
		return HttpResponse.json(
			{
				message: 'topic.question.constraint.foreign_key_violation',
				statusCode: 409,
				description: 'Cannot delete topic because it is referenced by some question',
			},
			{ status: 409 },
		);
	}

	const index = topicsMocks.data.findIndex((topic) => topic.id === topicId);

	topicsMocks.data.splice(index, 1);

	return new HttpResponse(null, { status: 200 });
});
