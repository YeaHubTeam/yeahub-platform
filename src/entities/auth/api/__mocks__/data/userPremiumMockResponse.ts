import { skillsMock } from '@/entities/skill/@x/auth';
import { userRolesMock } from '@/entities/user/@x/auth';

import { AuthResponse, FullProfile, Profile } from '../../../model/types/auth';

export const userPremiumCredentials = {
	username: 'user-premium@yeahub.ru',
	password: 'Password123!',
} as const;

const userPremiumUserRoles = [
	userRolesMock.find((role) => role.id === 3)!,
	userRolesMock.find((role) => role.id === 7)!,
];

const userPremiumUser = {
	id: '40b8f5bb-07d7-4fac-98ef-42ca16de4197',
	username: 'yuzerpremium1',
	telegramUsername: null,
	country: '',
	city: 'YeaHub1',
	email: userPremiumCredentials.username,
	birthday: null,
	address: '',
	avatarUrl: '',
	createdAt: '2025-02-20T08:02:57.032Z',
	isVerified: true,
	userRoles: userPremiumUserRoles,
};

const userPremiumProfiles: Profile[] = [
	{
		id: '78e18e07-83fa-4528-956d-3134f8ae49f9',
		profileType: 1,
		specializationId: 29,
		markingWeight: 1,
		description: '',
		socialNetwork: [],
		image_src: '',
		links: [],
		isActive: false,
		profileSkills: [skillsMock.data[3]],
	},
	{
		id: 'baa51c8a-5ffc-441a-8579-89003bdf4150',
		profileType: 1,
		specializationId: 26,
		markingWeight: 1,
		description: '222333334456',
		socialNetwork: [{ code: 'telegram', title: '`12213' }],
		image_src: '',
		links: [],
		isActive: false,
		profileSkills: [skillsMock.data[7]],
	},
	{
		id: 'bae420a0-98be-4fb1-8a75-5a36cf45872b',
		profileType: 1,
		specializationId: 21,
		markingWeight: 1,
		description: 'Profile description',
		socialNetwork: [{ code: 'instagram', title: 'instagram.url' }],
		image_src: 'https://example.com/image.jpg',
		links: [],
		isActive: false,
		profileSkills: [skillsMock.data[8]],
	},
	{
		id: '81af7464-c4d5-434c-8cd3-4b84de1a621d',
		profileType: 1,
		specializationId: 11,
		markingWeight: 1,
		description: '<p>hhhh</p>',
		socialNetwork: [],
		image_src: '',
		links: [],
		isActive: true,
		profileSkills: [skillsMock.data[9], skillsMock.data[10]],
	},
	{
		id: 'ff3f5a75-b62e-4283-9dd2-337377db46c3',
		profileType: 1,
		specializationId: 28,
		markingWeight: 1,
		description: '',
		socialNetwork: [],
		image_src: '',
		links: [],
		isActive: false,
		profileSkills: [skillsMock.data[11]],
	},
];

const userPremiumActiveProfile = userPremiumProfiles.find((profile) => profile.isActive)!;

const userPremiumSubscriptions: FullProfile['subscriptions'] = [
	{
		id: '47c05bd2-a105-49fb-99fb-3a2c1f126517',
		createDate: '2026-03-09T16:54:30.664Z',
		endDate: '2027-03-09T16:54:36.573Z',
		subscriptionId: 5,
		userId: userPremiumUser.id,
		state: 'canceled ',
		subscription: {
			id: '5',
			name: 'Годовой премиум',
			pricePerMonth: 400,
			description: 'Yeahub выгоднее с каждым годом',
			roles: [{ id: '7', name: 'candidate-premium', permissions: [] }],
		},
	},
	{
		id: 'a5943a4f-8b77-4912-98e9-c222891e6373',
		createDate: '2025-06-21T18:35:26.602Z',
		endDate: '2026-03-08T00:00:00.000Z',
		subscriptionId: 3,
		userId: userPremiumUser.id,
		state: 'inactive',
		subscription: {
			id: '3',
			name: 'Участник сообщества',
			pricePerMonth: 800,
			roles: [{ id: '7', name: 'candidate-premium', permissions: [] }],
		},
	},
];

export const userPremiumAuthMockResponse: AuthResponse = {
	access_token:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXItcHJlbWl1bUB5ZWFodWIucnUiLCJzdWIiOiI0MGI4ZjViYi0wN2Q3LTRmYWMtOThlZi00MmNhMTZkZTQxOTciLCJpYXQiOjE3Nzk3MjE3MjIsImV4cCI6MTc3OTgwODEyMn0.pENjPgmamlxfp2IB67tsNDUXbKq6t7G0NVMJI01H9PA',
	user: {
		...userPremiumUser,
		updatedAt: '2026-05-25T15:04:06.066Z',
		subscriptions: [],
	},
};

export const userPremiumProfileMockResponse: FullProfile = {
	...userPremiumUser,
	updatedAt: '2026-05-25T15:08:42.576Z',
	profiles: userPremiumProfiles,
	activeProfile: userPremiumActiveProfile,
	subscriptions: userPremiumSubscriptions,
};
