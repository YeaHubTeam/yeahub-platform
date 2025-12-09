import type { UsersRating, UsersRatingBySpecialization } from '../../../model/types/usersRating';

const usersRating: UsersRating = [
	{
		userId: '1',
		username: 'Christopher',
		avatarUrl: 'https://mockmind-api.uifaces.co/content/human/222.jpg',
		ratingScore: 1100,
	},
	{
		userId: '2',
		username: 'Anna',
		avatarUrl: 'http://mockmind-api.uifaces.co/content/human/219.jpg',
		ratingScore: 900,
	},
	{
		userId: '3',
		username: 'Alexander',
		avatarUrl: 'https://mockmind-api.uifaces.co/content/human/80.jpg',
		ratingScore: 700,
	},
];

export const usersRatingMock: UsersRatingBySpecialization = [...Array(28)].reduce(
	(acc, _, i) => Object.assign(acc, { [i + 1]: usersRating }),
	{},
);
