import { Response } from '@/shared/libs';

import type { User } from '../../model/types/user';

export const usersDataMock: Response<User[]> = {
	data: [
		{
			id: '0090dc74-0086-45b2-9965-5b17544fe30e',
			username: 'user_bzvkytmfob',
			telegramUsername: null,
			country: 'USA',
			city: 'New York',
			email: 'test_user_bzvkytmfob@example.com',
			birthday: '1990-01-01T00:00:00.000Z',
			address: '123 Main St',
			avatarUrl: 'http://example.com/avatar.jpg',
			createdAt: '2026-01-16T13:13:23.813Z',
			updatedAt: '2026-01-16T13:13:26.418Z',
			isVerified: false,
			userRoles: [
				{
					id: 1,
					name: 'guest',
					permissions: [
						{
							id: 1,
							name: 'View members list/profile',
						},
						{
							id: 6,
							name: 'View vacancies',
						},
					],
				},
			],
		},
		{
			id: '3c8b7a58-91f4-4cf7-8d3a-71c7d9d34711',
			username: 'user_kplxqwerna',
			telegramUsername: 'kplxqwerna',
			country: 'UK',
			city: 'London',
			email: 'test_user_kplxqwerna@example.com',
			birthday: '1988-04-12T00:00:00.000Z',
			address: '45 Baker Street',
			avatarUrl: 'http://example.com/avatar2.jpg',
			createdAt: '2026-01-17T09:24:11.120Z',
			updatedAt: '2026-01-17T09:25:03.441Z',
			isVerified: true,
			userRoles: [
				{
					id: 2,
					name: 'candidate',
					permissions: [
						{
							id: 1,
							name: 'View members list/profile',
						},
						{
							id: 2,
							name: 'View candidates list/profile',
						},
						{
							id: 3,
							name: 'Edit own profile',
						},
						{
							id: 6,
							name: 'View vacancies',
						},
					],
				},
			],
		},
		{
			id: 'f1b23a4c-7d9e-4b2a-bc53-11d87fa12e90',
			username: 'user_mnvcxzlkjh',
			telegramUsername: null,
			country: 'Germany',
			city: 'Berlin',
			email: 'test_user_mnvcxzlkjh@example.com',
			birthday: '1995-07-21T00:00:00.000Z',
			address: '18 Alexanderplatz',
			avatarUrl: 'http://example.com/avatar3.jpg',
			createdAt: '2026-01-18T14:02:45.003Z',
			updatedAt: '2026-01-18T14:04:10.221Z',
			isVerified: false,
			userRoles: [
				{
					id: 3,
					name: 'member',
					permissions: [
						{
							id: 1,
							name: 'View members list/profile',
						},
						{
							id: 2,
							name: 'View candidates list/profile',
						},
						{
							id: 3,
							name: 'Edit own profile',
						},
						{
							id: 6,
							name: 'View vacancies',
						},
						{
							id: 8,
							name: 'Edit user rate',
						},
						{
							id: 9,
							name: 'Add articles/blog',
						},
						{
							id: 10,
							name: 'Edit own articles/blog',
						},
					],
				},
			],
		},
		{
			id: '9a1df7c3-2e8b-4c10-b4aa-6201c8f0f7bb',
			username: 'user_qazwsxedcr',
			telegramUsername: 'qazwsxedcr',
			country: 'France',
			city: 'Paris',
			email: 'test_user_qazwsxedcr@example.com',
			birthday: '1992-11-05T00:00:00.000Z',
			address: '10 Rue de Rivoli',
			avatarUrl: 'http://example.com/avatar4.jpg',
			createdAt: '2026-01-19T08:31:12.987Z',
			updatedAt: '2026-01-19T08:33:40.100Z',
			isVerified: true,
			userRoles: [
				{
					id: 4,
					name: 'admin',
					permissions: [
						{
							id: 1,
							name: 'View members list/profile',
						},
						{
							id: 2,
							name: 'View candidates list/profile',
						},
						{
							id: 3,
							name: 'Edit own profile',
						},
						{
							id: 4,
							name: 'Edit user profiles',
						},
						{
							id: 5,
							name: 'Add (edit own) vacancy',
						},
						{
							id: 6,
							name: 'View vacancies',
						},
						{
							id: 7,
							name: 'Edit user roles',
						},
						{
							id: 8,
							name: 'Edit user rate',
						},
						{
							id: 9,
							name: 'Add articles/blog',
						},
						{
							id: 10,
							name: 'Edit own articles/blog',
						},
						{
							id: 11,
							name: 'Edit user articles/blog',
						},
						{
							id: 12,
							name: 'Edit system dictionaries',
						},
					],
				},
			],
		},
		{
			id: '7b5c1d3e-88a4-4fb2-9d1c-2b7d99e94a20',
			username: 'user_lkjhgfdsap',
			telegramUsername: null,
			country: 'Italy',
			city: 'Rome',
			email: 'test_user_lkjhgfdsap@example.com',
			birthday: '1985-03-18T00:00:00.000Z',
			address: '22 Via Roma',
			avatarUrl: 'http://example.com/avatar5.jpg',
			createdAt: '2026-01-20T16:45:01.543Z',
			updatedAt: '2026-01-20T16:46:22.772Z',
			isVerified: false,
			userRoles: [
				{
					id: 5,
					name: 'HR',
					permissions: [
						{
							id: 1,
							name: 'View members list/profile',
						},
						{
							id: 5,
							name: 'Add (edit own) vacancy',
						},
					],
				},
			],
		},
		{
			id: '4e2f9a8d-0c11-4f8e-a4da-991a8c3ff012',
			username: 'user_poiuytrewq',
			telegramUsername: 'poiuytrewq',
			country: 'Spain',
			city: 'Madrid',
			email: 'test_user_poiuytrewq@example.com',
			birthday: '1998-09-30T00:00:00.000Z',
			address: '7 Gran Via',
			avatarUrl: 'http://example.com/avatar6.jpg',
			createdAt: '2026-01-21T11:10:35.654Z',
			updatedAt: '2026-01-21T11:13:58.876Z',
			isVerified: true,
			userRoles: [
				{
					id: 6,
					name: 'candidate-free',
					permissions: [],
				},
			],
		},
		{
			id: '21f4e91c-bdc3-4c65-8b30-59aa4d123ab8',
			username: 'user_zmxncbvalk',
			telegramUsername: null,
			country: 'Netherlands',
			city: 'Amsterdam',
			email: 'test_user_zmxncbvalk@example.com',
			birthday: '1991-06-14T00:00:00.000Z',
			address: '99 Damrak',
			avatarUrl: 'http://example.com/avatar7.jpg',
			createdAt: '2026-01-22T07:05:19.300Z',
			updatedAt: '2026-01-22T07:06:44.618Z',
			isVerified: false,
			userRoles: [
				{
					id: 1,
					name: 'guest',
					permissions: [
						{
							id: 1,
							name: 'View members list/profile',
						},
						{
							id: 6,
							name: 'View vacancies',
						},
					],
				},
			],
		},
		{
			id: 'a77c45ef-5f73-49c0-b2db-44e7c821aa61',
			username: 'user_hgfdsaqwer',
			telegramUsername: 'hgfdsaqwer',
			country: 'Poland',
			city: 'Warsaw',
			email: 'test_user_hgfdsaqwer@example.com',
			birthday: '1989-12-25T00:00:00.000Z',
			address: '14 Nowy Swiat',
			avatarUrl: 'http://example.com/avatar8.jpg',
			createdAt: '2026-01-23T19:22:41.104Z',
			updatedAt: '2026-01-23T19:24:30.009Z',
			isVerified: true,
			userRoles: [
				{
					id: 2,
					name: 'candidate',
					permissions: [
						{
							id: 1,
							name: 'View members list/profile',
						},
						{
							id: 2,
							name: 'View candidates list/profile',
						},
						{
							id: 3,
							name: 'Edit own profile',
						},
						{
							id: 6,
							name: 'View vacancies',
						},
					],
				},
			],
		},
		{
			id: 'd98a35b2-f421-42a5-8428-efc1d56f1450',
			username: 'user_vbnmrewqaz',
			telegramUsername: null,
			country: 'Czech Republic',
			city: 'Prague',
			email: 'test_user_vbnmrewqaz@example.com',
			birthday: '1994-02-09T00:00:00.000Z',
			address: '3 Old Town Square',
			avatarUrl: 'http://example.com/avatar9.jpg',
			createdAt: '2026-01-24T12:14:09.777Z',
			updatedAt: '2026-01-24T12:18:51.342Z',
			isVerified: false,
			userRoles: [
				{
					id: 3,
					name: 'member',
					permissions: [
						{
							id: 1,
							name: 'View members list/profile',
						},
						{
							id: 2,
							name: 'View candidates list/profile',
						},
						{
							id: 3,
							name: 'Edit own profile',
						},
						{
							id: 6,
							name: 'View vacancies',
						},
						{
							id: 8,
							name: 'Edit user rate',
						},
						{
							id: 9,
							name: 'Add articles/blog',
						},
						{
							id: 10,
							name: 'Edit own articles/blog',
						},
					],
				},
			],
		},
		{
			id: '6f431e0a-3b2e-456c-9c7a-84d1c0f938d2',
			username: 'user_asdfghjklo',
			telegramUsername: 'asdfghjklo',
			country: 'Portugal',
			city: 'Lisbon',
			email: 'test_user_asdfghjklo@example.com',
			birthday: '1996-08-16T00:00:00.000Z',
			address: '20 Avenida da Liberdade',
			avatarUrl: 'http://example.com/avatar10.jpg',
			createdAt: '2026-01-25T10:01:33.431Z',
			updatedAt: '2026-01-25T10:02:01.702Z',
			isVerified: true,
			userRoles: [
				{
					id: 4,
					name: 'admin',
					permissions: [
						{
							id: 1,
							name: 'View members list/profile',
						},
						{
							id: 2,
							name: 'View candidates list/profile',
						},
						{
							id: 3,
							name: 'Edit own profile',
						},
						{
							id: 4,
							name: 'Edit user profiles',
						},
						{
							id: 5,
							name: 'Add (edit own) vacancy',
						},
						{
							id: 6,
							name: 'View vacancies',
						},
						{
							id: 7,
							name: 'Edit user roles',
						},
						{
							id: 8,
							name: 'Edit user rate',
						},
						{
							id: 9,
							name: 'Add articles/blog',
						},
						{
							id: 10,
							name: 'Edit own articles/blog',
						},
						{
							id: 11,
							name: 'Edit user articles/blog',
						},
						{
							id: 12,
							name: 'Edit system dictionaries',
						},
					],
				},
			],
		},
		{
			id: 'b3e7a1f5-9d88-44e6-90fa-372b4d8203cd',
			username: 'user_tyuioplkjh',
			telegramUsername: null,
			country: 'Sweden',
			city: 'Stockholm',
			email: 'test_user_tyuioplkjh@example.com',
			birthday: '1993-05-03T00:00:00.000Z',
			address: '8 Drottninggatan',
			avatarUrl: 'http://example.com/avatar11.jpg',
			createdAt: '2026-01-26T15:44:18.219Z',
			updatedAt: '2026-01-26T15:45:50.117Z',
			isVerified: false,
			userRoles: [
				{
					id: 5,
					name: 'HR',
					permissions: [
						{
							id: 1,
							name: 'View members list/profile',
						},
						{
							id: 5,
							name: 'Add (edit own) vacancy',
						},
					],
				},
			],
		},
		{
			id: 'e428d9f0-2a5b-435e-8012-bc7299de4019',
			username: 'user_qwertybnml',
			telegramUsername: 'qwertybnml',
			country: 'Finland',
			city: 'Helsinki',
			email: 'test_user_qwertybnml@example.com',
			birthday: '1987-10-28T00:00:00.000Z',
			address: '5 Mannerheimintie',
			avatarUrl: 'http://example.com/avatar12.jpg',
			createdAt: '2026-01-27T06:32:11.891Z',
			updatedAt: '2026-01-27T06:35:29.521Z',
			isVerified: true,
			userRoles: [
				{
					id: 6,
					name: 'candidate-free',
					permissions: [],
				},
			],
		},
		{
			id: '8d0f4e63-a7b4-40a6-93ef-23eaf1c52f77',
			username: 'user_cxzlkjhqwe',
			telegramUsername: null,
			country: 'Norway',
			city: 'Oslo',
			email: 'test_user_cxzlkjhqwe@example.com',
			birthday: '1999-01-11T00:00:00.000Z',
			address: '11 Karl Johans gate',
			avatarUrl: 'http://example.com/avatar13.jpg',
			createdAt: '2026-01-28T18:20:43.610Z',
			updatedAt: '2026-01-28T18:21:17.905Z',
			isVerified: false,
			userRoles: [
				{
					id: 1,
					name: 'guest',
					permissions: [
						{
							id: 1,
							name: 'View members list/profile',
						},
						{
							id: 6,
							name: 'View vacancies',
						},
					],
				},
			],
		},
		{
			id: '0db5c76e-4c3f-43af-963c-946fb1e3d7c4',
			username: 'user_nmklopqwer',
			telegramUsername: 'nmklopqwer',
			country: 'Ireland',
			city: 'Dublin',
			email: 'test_user_nmklopqwer@example.com',
			birthday: '1990-04-07T00:00:00.000Z',
			address: "16 O'Connell Street",
			avatarUrl: 'http://example.com/avatar14.jpg',
			createdAt: '2026-01-29T09:09:09.909Z',
			updatedAt: '2026-01-29T09:10:44.111Z',
			isVerified: true,
			userRoles: [
				{
					id: 2,
					name: 'candidate',
					permissions: [
						{
							id: 1,
							name: 'View members list/profile',
						},
						{
							id: 2,
							name: 'View candidates list/profile',
						},
						{
							id: 3,
							name: 'Edit own profile',
						},
						{
							id: 6,
							name: 'View vacancies',
						},
					],
				},
			],
		},
		{
			id: 'c17e495a-995c-4d53-8f77-348fd7240a31',
			username: 'user_bvcxzlkjhg',
			telegramUsername: null,
			country: 'Belgium',
			city: 'Brussels',
			email: 'test_user_bvcxzlkjhg@example.com',
			birthday: '1997-06-19T00:00:00.000Z',
			address: '2 Grand Place',
			avatarUrl: 'http://example.com/avatar15.jpg',
			createdAt: '2026-01-30T13:27:36.502Z',
			updatedAt: '2026-01-30T13:28:58.603Z',
			isVerified: false,
			userRoles: [
				{
					id: 3,
					name: 'member',
					permissions: [
						{
							id: 1,
							name: 'View members list/profile',
						},
						{
							id: 2,
							name: 'View candidates list/profile',
						},
						{
							id: 3,
							name: 'Edit own profile',
						},
						{
							id: 6,
							name: 'View vacancies',
						},
						{
							id: 8,
							name: 'Edit user rate',
						},
						{
							id: 9,
							name: 'Add articles/blog',
						},
						{
							id: 10,
							name: 'Edit own articles/blog',
						},
					],
				},
			],
		},
		{
			id: '58bd7429-66e7-4b83-9a47-bd9bc0a7323f',
			username: 'user_lopmnbvcxz',
			telegramUsername: 'lopmnbvcxz',
			country: 'Austria',
			city: 'Vienna',
			email: 'test_user_lopmnbvcxz@example.com',
			birthday: '1986-12-02T00:00:00.000Z',
			address: '30 Ringstrasse',
			avatarUrl: 'http://example.com/avatar16.jpg',
			createdAt: '2026-01-31T17:55:12.760Z',
			updatedAt: '2026-01-31T17:58:42.310Z',
			isVerified: true,
			userRoles: [
				{
					id: 4,
					name: 'admin',
					permissions: [
						{
							id: 1,
							name: 'View members list/profile',
						},
						{
							id: 2,
							name: 'View candidates list/profile',
						},
						{
							id: 3,
							name: 'Edit own profile',
						},
						{
							id: 4,
							name: 'Edit user profiles',
						},
						{
							id: 5,
							name: 'Add (edit own) vacancy',
						},
						{
							id: 6,
							name: 'View vacancies',
						},
						{
							id: 7,
							name: 'Edit user roles',
						},
						{
							id: 8,
							name: 'Edit user rate',
						},
						{
							id: 9,
							name: 'Add articles/blog',
						},
						{
							id: 10,
							name: 'Edit own articles/blog',
						},
						{
							id: 11,
							name: 'Edit user articles/blog',
						},
						{
							id: 12,
							name: 'Edit system dictionaries',
						},
					],
				},
			],
		},
		{
			id: '2e7a0f91-1cb2-4db2-8767-1de49e3e4a52',
			username: 'user_ghjklpoiuy',
			telegramUsername: null,
			country: 'Switzerland',
			city: 'Zurich',
			email: 'test_user_ghjklpoiuy@example.com',
			birthday: '1991-09-13T00:00:00.000Z',
			address: '12 Bahnhofstrasse',
			avatarUrl: 'http://example.com/avatar17.jpg',
			createdAt: '2026-02-01T08:40:26.145Z',
			updatedAt: '2026-02-01T08:41:39.884Z',
			isVerified: false,
			userRoles: [
				{
					id: 5,
					name: 'HR',
					permissions: [
						{
							id: 1,
							name: 'View members list/profile',
						},
						{
							id: 5,
							name: 'Add (edit own) vacancy',
						},
					],
				},
			],
		},
		{
			id: '91df85b0-61bb-4a89-9dd3-c68e2eb99d44',
			username: 'user_rtyuioasdf',
			telegramUsername: 'rtyuioasdf',
			country: 'Denmark',
			city: 'Copenhagen',
			email: 'test_user_rtyuioasdf@example.com',
			birthday: '1994-11-22T00:00:00.000Z',
			address: '4 Nyhavn',
			avatarUrl: 'http://example.com/avatar18.jpg',
			createdAt: '2026-02-02T11:18:49.001Z',
			updatedAt: '2026-02-02T11:20:12.337Z',
			isVerified: true,
			userRoles: [
				{
					id: 6,
					name: 'candidate-free',
					permissions: [],
				},
			],
		},
		{
			id: '71a6b3d9-ec8c-4c15-b8e3-f6d96ebc0829',
			username: 'user_fghjklqwer',
			telegramUsername: null,
			country: 'Turkey',
			city: 'Istanbul',
			email: 'test_user_fghjklqwer@example.com',
			birthday: '1989-02-17T00:00:00.000Z',
			address: '19 Istiklal Avenue',
			avatarUrl: 'http://example.com/avatar19.jpg',
			createdAt: '2026-02-03T20:05:15.678Z',
			updatedAt: '2026-02-03T20:07:40.908Z',
			isVerified: false,
			userRoles: [
				{
					id: 1,
					name: 'guest',
					permissions: [
						{
							id: 1,
							name: 'View members list/profile',
						},
						{
							id: 6,
							name: 'View vacancies',
						},
					],
				},
			],
		},
		{
			id: 'adfe84d0-8d1f-44ec-9cf6-36b2400e9843',
			username: 'user_xcvbnmqwer',
			telegramUsername: 'xcvbnmqwer',
			country: 'Japan',
			city: 'Tokyo',
			email: 'test_user_xcvbnmqwer@example.com',
			birthday: '1996-05-26T00:00:00.000Z',
			address: '1 Shibuya Crossing',
			avatarUrl: 'http://example.com/avatar20.jpg',
			createdAt: '2026-02-04T05:13:23.813Z',
			updatedAt: '2026-02-04T05:15:26.418Z',
			isVerified: true,
			userRoles: [
				{
					id: 7,
					name: 'candidate-premium',
					permissions: [],
				},
			],
		},
	],
	limit: 10,
	page: 1,
	total: 20,
};
