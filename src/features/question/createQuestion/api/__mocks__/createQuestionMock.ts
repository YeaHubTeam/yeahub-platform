import { http, HttpResponse, PathParams } from 'msw';

import { questionsMock } from '@/entities/question';

import { createQuestionApiUrls } from '../../model/constants/createQuestionConstants';
import {
	CreateQuestionBodyRequest,
	CreateQuestionResponse,
} from '../../model/types/questionCreateTypes';

import { newQuestionMock } from './data';

export const createQuestionMock = http.post<
	PathParams,
	CreateQuestionBodyRequest,
	CreateQuestionResponse
>(process.env.API_URL + createQuestionApiUrls.createQuestion, async ({ request }) => {
	const formData = await request.json();

	const lastElement = questionsMock.data.at(-1);
	const newId = lastElement ? lastElement.id + 1 : 1;
	const newQuestion = newQuestionMock(formData, newId);

	questionsMock.data.push(newQuestion);
	return HttpResponse.json(newQuestion);
});
