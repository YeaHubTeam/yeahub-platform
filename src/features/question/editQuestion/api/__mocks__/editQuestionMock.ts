import { http, HttpResponse, PathParams } from 'msw';

import { getMockAuthProfile } from '@/entities/auth';
import { questionsMock } from '@/entities/question';

import { editQuestionApiUrls } from '../../model/constants/editQuestionConstants';
import {
	EditQuestionBodyRequest,
	EditQuestionResponse,
} from '../../model/types/questionEditPageTypes';

export const editQuestionMock = http.patch<
	PathParams,
	EditQuestionBodyRequest,
	EditQuestionResponse | ApiErrorData<string>
>(process.env.API_URL + editQuestionApiUrls.editQuestion, async ({ request }) => {
	const formData = await request.json();

	const questionIndex = questionsMock.data.findIndex((question) => question.id === formData.id);

	const profileMockResponse = getMockAuthProfile(request);

	const isAdmin = profileMockResponse?.userRoles.some((role) => role.name === 'admin') ?? false;
	const isAuthor = profileMockResponse?.userRoles.some((role) => role.name === 'author') ?? false;
	const isAuthorOfThisQuestion =
		questionsMock.data[questionIndex]?.createdBy?.id === profileMockResponse?.id;

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

	if (!isAdmin && !(isAuthor && isAuthorOfThisQuestion)) {
		return HttpResponse.json(
			{
				message: 'auth.roles.admin_or_author_required',
				statusCode: 403,
				description: 'Admin or author required',
			},
			{ status: 403 },
		);
	}

	if (questionIndex === -1) {
		return HttpResponse.json(
			{
				message: 'question.question.not_found',
				statusCode: 404,
				description: 'Question not found',
			},
			{ status: 404 },
		);
	}

	const isTitleConflict = questionsMock.data.some(
		(question) => question.title === formData.title && question.id !== formData.id,
	);

	if (isTitleConflict) {
		return HttpResponse.json(
			{
				message: 'question.question.title.conflict',
				statusCode: 409,
				description: 'Question with same title already exists',
			},
			{ status: 409 },
		);
	}

	const updateQuestion = {
		...questionsMock.data[questionIndex],
		...formData,
		updatedAt: new Date().toISOString(),
	};

	questionsMock.data[questionIndex] = updateQuestion;

	return HttpResponse.json(updateQuestion);
});
