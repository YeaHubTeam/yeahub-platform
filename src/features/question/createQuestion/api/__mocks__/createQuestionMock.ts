import { http, HttpResponse, PathParams } from 'msw';

import { getMockAuthProfile } from '@/entities/auth';
import { questionsMock } from '@/entities/question';

import { createQuestionApiUrls } from '../../model/constants/createQuestionConstants';
import {
	CreateQuestionBodyRequest,
	CreateQuestionResponse,
	CreateQuestionsError,
} from '../../model/types/questionCreateTypes';

import { newQuestionMock } from './data';

export const createQuestionMock = http.post<
	PathParams,
	CreateQuestionBodyRequest,
	CreateQuestionResponse | ApiErrorData<CreateQuestionsError>
>(process.env.API_URL + createQuestionApiUrls.createQuestion, async ({ request }) => {
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

	const isAdmin = profileMockResponse.userRoles.some((role) => role.name === 'admin');

	const isAuthor = profileMockResponse.userRoles.some((role) => role.name === 'author');

	if (!isAdmin && !isAuthor) {
		return HttpResponse.json(
			{
				message: 'auth.roles.admin.or.author.required',
				statusCode: 403,
				description: 'Admin or author required',
			},
			{ status: 403 },
		);
	}

	const formData = await request.json();

	const title = formData.title;

	const isQuestion = questionsMock.data.some((question) => question.title === title);

	if (isQuestion) {
		return HttpResponse.json(
			{
				message: 'question.question.title.conflict',
				statusCode: 409,
				description: 'Question with same title already exists',
			},
			{ status: 409 },
		);
	}

	const lastElement = questionsMock.data.at(-1);
	const newId = lastElement ? lastElement.id + 1 : 1;
	const newQuestion = newQuestionMock(formData, newId);

	questionsMock.data.push(newQuestion);
	return HttpResponse.json(newQuestion);
});
