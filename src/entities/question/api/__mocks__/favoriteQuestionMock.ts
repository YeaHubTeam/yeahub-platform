import { DefaultBodyType, http, HttpResponse } from 'msw';

import { userQuestionsFavoriteMock } from './data/userQuestiosFavoriteMock';

const favoriteQuestionApiUrls = {
	addFavoriteQuestion: 'questions/favorites/:profileId/:questionId',
	resetFavoriteQuestion: 'questions/favorites/:profileId/:questionId',
};

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

export const deleteFavoriteQuestionMock = http.delete<
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
