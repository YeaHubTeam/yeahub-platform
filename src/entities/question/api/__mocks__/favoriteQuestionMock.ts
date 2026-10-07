import { DefaultBodyType, http, HttpResponse } from 'msw';

import { favoriteQuestionApiUrls } from '@/features/question/favoriteQuestion/model/constants/favoriteQuestionConstants';

import { userQuestionsFavoriteMock } from './data/userQuestiosFavoriteMock';

export const addFavoriteQuestionMock = http.post<
	{
		profileId: string;
		questionId: string;
	},
	DefaultBodyType,
	DefaultBodyType
>(process.env.API_URL + favoriteQuestionApiUrls.addFavoriteQuestion, ({ params }) => {
	const { profileId, questionId } = params;

	const profile = userQuestionsFavoriteMock[profileId];

	if (!profile) {
		return HttpResponse.json(null, { status: 404 });
	}

	const question = profile[questionId];

	if (!question) {
		return HttpResponse.json(null, { status: 404 });
	}

	question.isFavorite = true;

	return new HttpResponse(null, { status: 200 });
});

export const resetFavoriteQuestionMock = http.delete<
	{
		profileId: string;
		questionId: string;
	},
	DefaultBodyType,
	DefaultBodyType
>(process.env.API_URL + favoriteQuestionApiUrls.resetFavoriteQuestion, ({ params }) => {
	const { profileId, questionId } = params;

	const profile = userQuestionsFavoriteMock[profileId];

	if (!profile) {
		return HttpResponse.json(null, { status: 404 });
	}

	const question = profile[questionId];

	if (!question) {
		return HttpResponse.json(null, { status: 404 });
	}

	question.isFavorite = false;

	return new HttpResponse(null, { status: 200 });
});
