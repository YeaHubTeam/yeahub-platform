import { DefaultBodyType, http, HttpResponse } from 'msw';

import { getRandomInt } from '@/shared/libs';

import { usersRatingApiUrls } from '../model/constants/usersRatingConstants';
import type { GetUsersRatingResponse, UserRating } from '../model/types/usersRating';

export const usersRatingMock = http.get<
	Record<string, string>,
	DefaultBodyType,
	GetUsersRatingResponse
>(`${process.env.API_URL}${usersRatingApiUrls.getUsersRating}`, ({ request }) => {
	const url = new URL(request.url);
	const page = url.searchParams.get('page') ?? 1;
	const limit = url.searchParams.get('limit') ?? 10;

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

	const allUsers = usersRating();

	const sortedUsersRating = () => {
		const res = [...usersRating()].sort((a, b) => b.ratingPoints - a.ratingPoints);
		res.forEach((user, index) => {
			user.place = index + 1;
			user.progress = Math.floor((user.ratingPoints / 1200) * 100);
		});
		return res;
	};

	const data = {
		data: sortedUsersRating(),
		limit: Number(limit),
		page: Number(page),
		total: allUsers.length,
	};

	return HttpResponse.json(data);
});
