import { AuthResponse, FullProfile } from '../../../model/types/auth';

export const userUnverifiedCredentials = {
	username: 'user-unverified@yeahub.ru',
	password: 'Password123!',
} as const;

export const userUnverifiedAuthMockResponse = {
	access_token:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXItdW52ZXJpZmllZEB5ZWFodWIucnUiLCJzdWIiOiI3NGVhMjc2My1jNGNlLTQ1NWEtOGIyZi1lMjU5NzcyMjgwMmEiLCJpYXQiOjE3Nzk3MjA2NjksImV4cCI6MTc3OTgwNzA2OX0.jJ0xu47Zu9lNa9vc3U2_95_IAnGQEDc7JvZIwPfhhPk',
	user: {
		id: '74ea2763-c4ce-455a-8b2f-e2597722802a',
		username: 'yuzernevirificirovannyrrw',
		telegramUsername: null,
		phone: null,
		country: null,
		city: '',
		email: userUnverifiedCredentials.username,
		birthday: null,
		address: '',
		avatarUrl: '',
		createdAt: '2025-02-20T08:04:53.931Z',
		updatedAt: '2026-05-25T09:36:22.866Z',
		isVerified: false,
		isEmailNotificationsEnable: true,
		userRoles: [
			{
				id: 6,
				name: 'candidate-free',
				permissions: [],
			},
		],
	},
} as unknown as AuthResponse;

export const userUnverifiedProfileMockResponse = {
	id: '74ea2763-c4ce-455a-8b2f-e2597722802a',
	username: 'yuzernevirificirovannyrrw',
	telegramUsername: null,
	phone: null,
	country: null,
	city: '',
	email: userUnverifiedCredentials.username,
	birthday: null,
	address: '',
	avatarUrl: '',
	createdAt: '2025-02-20T08:04:53.931Z',
	updatedAt: '2026-05-25T14:51:09.866Z',
	isVerified: false,
	isEmailNotificationsEnable: true,
	userRoles: [
		{
			id: 6,
			name: 'candidate-free',
			permissions: [],
		},
	],
	profiles: [
		{
			id: '7d2ee495-5a3b-42ba-ba6b-d26de77ee958',
			profileType: 1,
			specializationId: 24,
			markingWeight: 1,
			description: '',
			socialNetwork: [],
			image_src: null,
			isActive: true,
			profileSkills: [],
			ratingPoints: 0,
		},
		{
			id: 'c04075d9-6eb7-4843-929c-d532459ac4bb',
			profileType: 1,
			specializationId: 20,
			markingWeight: 1,
			description: 'd',
			socialNetwork: [],
			image_src: null,
			isActive: false,
			profileSkills: [],
			ratingPoints: 0,
		},
		{
			id: '827442fb-b453-4e19-867f-2e1abc702e8f',
			profileType: 1,
			specializationId: 11,
			markingWeight: 1,
			description: '',
			socialNetwork: [],
			image_src: null,
			isActive: false,
			profileSkills: [],
			ratingPoints: 0,
		},
	],
	subscriptions: [],
} as unknown as FullProfile;
