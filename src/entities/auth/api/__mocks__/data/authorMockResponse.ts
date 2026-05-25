import { AuthResponse, FullProfile } from '../../../model/types/auth';

export const authorCredentials = {
	username: 'author@yeahub.ru',
	password: 'Password123!',
} as const;

const authorRoles = [
	{
		id: 8,
		name: 'author',
		permissions: [],
	},
	{
		id: 6,
		name: 'candidate-free',
		permissions: [],
	},
];

export const authorAuthMockResponse = {
	access_token:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImF1dGhvckB5ZWFodWIucnUiLCJzdWIiOiJiMjZkYzRjMy00YTdlLTQ3OWUtYTg1Mi1kMzlkZDg1YmYwOGUiLCJpYXQiOjE3Nzk3MjE3NzMsImV4cCI6MTc3OTgwODE3M30.Gk43gpHRtI4o8qXLyKv1rRXBJ2ZJvuj6aKq07QcDDxs',
	user: {
		id: 'b26dc4c3-4a7e-479e-a852-d39dd85bf08e',
		username: 'author',
		telegramUsername: null,
		phone: null,
		country: null,
		city: '',
		email: authorCredentials.username,
		birthday: null,
		address: '',
		avatarUrl: '',
		createdAt: '2025-07-09T18:38:02.203Z',
		updatedAt: '2026-05-23T22:26:38.091Z',
		isVerified: true,
		isEmailNotificationsEnable: true,
		userRoles: authorRoles,
	},
} as unknown as AuthResponse;

export const authorProfileMockResponse = {
	id: 'b26dc4c3-4a7e-479e-a852-d39dd85bf08e',
	username: 'author',
	telegramUsername: null,
	phone: null,
	country: null,
	city: '',
	email: authorCredentials.username,
	birthday: null,
	address: '',
	avatarUrl: '',
	createdAt: '2025-07-09T18:38:02.203Z',
	updatedAt: '2026-05-25T15:09:33.863Z',
	isVerified: true,
	isEmailNotificationsEnable: true,
	userRoles: authorRoles,
	profiles: [
		{
			id: '014c0711-e8bf-493b-9f44-e22bac173c0c',
			profileType: 1,
			specializationId: 23,
			markingWeight: 1,
			description: '',
			socialNetwork: [],
			image_src: null,
			isActive: false,
			profileSkills: [],
			ratingPoints: 0,
		},
		{
			id: '3f73836d-25db-4552-84e2-2476c79370c8',
			profileType: 1,
			specializationId: 165,
			markingWeight: 1,
			description: '',
			socialNetwork: [],
			image_src: null,
			isActive: true,
			profileSkills: [],
			ratingPoints: 0,
		},
	],
	subscriptions: [
		{
			id: '16296b6c-1202-452b-9314-cf9868480428',
			createDate: '2026-03-01T19:16:31.957Z',
			endDate: '2026-03-08T19:16:31.956Z',
			subscriptionId: 4,
			userId: 'b26dc4c3-4a7e-479e-a852-d39dd85bf08e',
			state: 'inactive',
			paymentAttemptsCount: 0,
			paymentError: null,
			fixedPrice: null,
			subscription: {
				id: 4,
				name: 'Пробная',
				code: 'trial',
				isActive: true,
				pricePerMonth: 0,
				discount: 0,
				monthPeriod: 1,
				description: null,
				promo: null,
				parentId: null,
				roles: [
					{
						id: 7,
						name: 'candidate-premium',
						permissions: [],
					},
				],
			},
		},
	],
} as unknown as FullProfile;
