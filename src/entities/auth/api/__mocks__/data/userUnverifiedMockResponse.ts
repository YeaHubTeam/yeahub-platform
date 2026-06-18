import { userRolesMock } from '@/entities/user/@x/auth';

import { AuthResponse, FullProfile, Profile } from '../../../model/types/auth';

export const userUnverifiedCredentials = {
	username: 'user-unverified@yeahub.ru',
	password: 'Password123!',
} as const;

const userUnverifiedUserRoles = [userRolesMock.find((role) => role.id === 6)!];

const userUnverifiedUser = {
	id: '74ea2763-c4ce-455a-8b2f-e2597722802a',
	username: 'yuzernevirificirovannyrrw',
	telegramUsername: null,
	country: '',
	city: '',
	email: userUnverifiedCredentials.username,
	birthday: null,
	address: '',
	avatarUrl: '',
	createdAt: '2025-02-20T08:04:53.931Z',
	isVerified: false,
	userRoles: userUnverifiedUserRoles,
};

const userUnverifiedProfiles: Profile[] = [
	{
		id: '7d2ee495-5a3b-42ba-ba6b-d26de77ee958',
		profileType: 1,
		specializationId: 24,
		markingWeight: 1,
		description: '',
		socialNetwork: [],
		image_src: '',
		links: [],
		isActive: true,
		profileSkills: [],
	},
	{
		id: 'c04075d9-6eb7-4843-929c-d532459ac4bb',
		profileType: 1,
		specializationId: 20,
		markingWeight: 1,
		description: 'd',
		socialNetwork: [],
		image_src: '',
		links: [],
		isActive: false,
		profileSkills: [],
	},
	{
		id: '827442fb-b453-4e19-867f-2e1abc702e8f',
		profileType: 1,
		specializationId: 11,
		markingWeight: 1,
		description: '',
		socialNetwork: [],
		image_src: '',
		links: [],
		isActive: false,
		profileSkills: [],
	},
];

const userUnverifiedActiveProfile = userUnverifiedProfiles.find((profile) => profile.isActive)!;

export const userUnverifiedAuthMockResponse: AuthResponse = {
	access_token:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXItdW52ZXJpZmllZEB5ZWFodWIucnUiLCJzdWIiOiI3NGVhMjc2My1jNGNlLTQ1NWEtOGIyZi1lMjU5NzcyMjgwMmEiLCJpYXQiOjE3Nzk3MjA2NjksImV4cCI6MTc3OTgwNzA2OX0.jJ0xu47Zu9lNa9vc3U2_95_IAnGQEDc7JvZIwPfhhPk',
	user: {
		...userUnverifiedUser,
		updatedAt: '2026-05-25T09:36:22.866Z',
		subscriptions: [],
	},
};

export const userUnverifiedProfileMockResponse: FullProfile = {
	...userUnverifiedUser,
	updatedAt: '2026-05-25T14:51:09.866Z',
	profiles: userUnverifiedProfiles,
	activeProfile: userUnverifiedActiveProfile,
	subscriptions: [],
};
