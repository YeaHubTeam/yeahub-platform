import {
	adminProfileMockResponse,
	userPremiumProfileMockResponse,
} from '@/entities/auth/@x/question';

import { questionsMock } from './questionsMock';

type FavoriteQuestion = {
	isFavorite: boolean;
};

type UserQuestionsFavoriteMock = Record<string, Record<string, FavoriteQuestion>>;

const profileIds = [
	...adminProfileMockResponse.profiles,
	...userPremiumProfileMockResponse.profiles,
].map(({ id }) => id);

const createFavoriteQuestions = (): Record<string, FavoriteQuestion> =>
	Object.fromEntries(
		questionsMock.data.map(({ id }) => [
			String(id),
			{
				isFavorite: false,
			},
		]),
	);

export const userQuestionsFavoriteMock: UserQuestionsFavoriteMock = Object.fromEntries(
	profileIds.map((profileId) => [profileId, createFavoriteQuestions()]),
);
