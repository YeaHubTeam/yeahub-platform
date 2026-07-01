import { DefaultBodyType, http, HttpResponse } from 'msw';

import { getMockAuthProfile } from '@/entities/auth';
import { collectionsMock } from '@/entities/collection';
import { questionsMock } from '@/entities/question';

import { deleteQuestionApiUrls } from '../../model/constants/deleteQuestionConstants';
import { DeleteQuestionError } from '../../model/types/deleteQuestionTypes';

export const deleteQuestionMock = http.delete<
	{ questionId: string },
	DefaultBodyType,
	ApiErrorData<DeleteQuestionError>
>(process.env.API_URL + deleteQuestionApiUrls.deleteQuestion, ({ params, request }) => {
	const questionId = Number(params.questionId);

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

	const currentQuestion = questionsMock.data.find((question) => question.id === questionId);

	if (!currentQuestion) {
		return HttpResponse.json(
			{
				message: 'question.question.not_found',
				statusCode: 404,
				description: 'Question not found',
			},
			{ status: 404 },
		);
	}

	const isAdmin = profileMockResponse.userRoles.some((role) => role.name === 'admin');
	const isAuthor = profileMockResponse.userRoles.some((role) => role.name === 'author');
	const isOwner = currentQuestion.createdBy.id === profileMockResponse.id;

	if (!isAdmin && !(isAuthor && isOwner)) {
		return HttpResponse.json(
			{
				message: 'auth.roles.author_can_change_only_own',
				statusCode: 403,
				description: 'Author can change only own data',
			},
			{ status: 403 },
		);
	}

	const hasQuestionInCollection = collectionsMock.data.some((collection) =>
		collection.questions?.some((question) => question.id === currentQuestion.id),
	);

	if (hasQuestionInCollection) {
		return HttpResponse.json(
			{
				message: 'question.collection.question_in_collection',
				statusCode: 409,
				description: 'Question is in collection and cannot be deleted',
			},
			{ status: 409 },
		);
	}

	const questionIndex = questionsMock.data.findIndex((question) => question.id === questionId);

	if (questionIndex !== -1) {
		questionsMock.data.splice(questionIndex, 1);
	}

	return new HttpResponse(null, { status: 200 });
});
