import { specializationsMock, type Specialization } from '@/entities/specialization/@x/user';

import type { UserRating, UsersRatingBySpecialization } from '../../model/types/usersRating';

const specializations: Specialization[] = specializationsMock.data;

const usersRating: UserRating[] = [
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

export const usersRatingMock: UsersRatingBySpecialization[] = specializations.map(
	(specialization) => ({
		specialization,
		questionsCount: 1200,
		users: usersRating,
	}),
);
