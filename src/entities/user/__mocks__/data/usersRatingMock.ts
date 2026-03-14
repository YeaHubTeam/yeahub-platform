import { getRandomInt } from '@/shared/libs';

import { specializationsMock, type Specialization } from '@/entities/specialization/@x/user';

import type { UserRating, UsersRatingBySpecialization } from '../../model/types/usersRating';

const specializations: Specialization[] = specializationsMock.data;

const usersRating = (): UserRating[] => [
	{
		userId: '1',
		username: 'James Wilson',
		avatarUrl: 'https://mockmind-api.uifaces.co/content/human/222.jpg',
		ratingPoints: getRandomInt(0, 1200),
		place: 0,
		progress: 0,
	},
	{
		userId: '2',
		username: 'Emma Johnson',
		avatarUrl: 'http://mockmind-api.uifaces.co/content/human/219.jpg',
		ratingPoints: getRandomInt(0, 1200),
		place: 0,
		progress: 0,
	},
	{
		userId: '3',
		username: 'David Rodriguez',
		avatarUrl: 'https://mockmind-api.uifaces.co/content/human/80.jpg',
		ratingPoints: getRandomInt(0, 1200),
		place: 0,
		progress: 0,
	},
	{
		userId: '4',
		username: 'Robert Kim',
		avatarUrl: 'https://mockmind-api.uifaces.co/content/human/213.jpg',
		ratingPoints: getRandomInt(0, 1200),
		place: 0,
		progress: 0,
	},
	{
		userId: '5',
		username: 'Olivia Martinez',
		avatarUrl: 'http://mockmind-api.uifaces.co/content/human/212.jpg',
		ratingPoints: getRandomInt(0, 1200),
		place: 0,
		progress: 0,
	},
	{
		userId: '6',
		username: 'William O’Connor',
		avatarUrl: 'https://mockmind-api.uifaces.co/content/human/215.jpg',
		ratingPoints: getRandomInt(0, 1200),
		place: 0,
		progress: 0,
	},
	{
		userId: '7',
		username: 'Thomas Müller',
		avatarUrl: 'https://mockmind-api.uifaces.co/content/human/211.jpg',
		ratingPoints: getRandomInt(0, 1200),
		place: 0,
		progress: 0,
	},
	{
		userId: '8',
		username: 'Sophia Lee',
		avatarUrl: 'http://mockmind-api.uifaces.co/content/human/216.jpg',
		ratingPoints: getRandomInt(0, 1200),
		place: 0,
		progress: 0,
	},
	{
		userId: '9',
		username: 'Benjamin Carter',
		avatarUrl: 'https://mockmind-api.uifaces.co/content/human/210.jpg',
		ratingPoints: getRandomInt(0, 1200),
		place: 0,
		progress: 0,
	},
	{
		userId: '10',
		username: 'Ava Patel',
		avatarUrl: 'https://mockmind-api.uifaces.co/content/human/217.jpg',
		ratingPoints: getRandomInt(0, 1200),
		place: 0,
		progress: 0,
	},
	{
		userId: '11',
		username: 'Daniel Hughes',
		avatarUrl: 'http://mockmind-api.uifaces.co/content/human/201.jpg',
		ratingPoints: getRandomInt(0, 1200),
		place: 0,
		progress: 0,
	},
	{
		userId: '12',
		username: 'Mia Andersen',
		avatarUrl: 'https://mockmind-api.uifaces.co/content/human/194.jpg',
		ratingPoints: getRandomInt(0, 1200),
		place: 0,
		progress: 0,
	},
];

const sortedUsersRating = () => {
	const res = [...usersRating()].sort((a, b) => b.ratingPoints - a.ratingPoints);
	res.forEach((user, index) => {
		user.place = index + 1;
		user.progress = Math.floor((user.ratingPoints / 1200) * 100);
	});
	return res;
};

export const sortedUsers = sortedUsersRating();

export const usersRatingMock: UsersRatingBySpecialization[] = specializations.map(
	(specialization) => ({
		specialization,
		questionsCount: 1200,
		users: sortedUsers,
		updatedAt: new Date().toLocaleDateString('ru-RU'),
	}),
);
