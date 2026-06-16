import { skillsMock } from '@/entities/skill/@x/auth';
import { userRolesMock } from '@/entities/user/@x/auth';

import { AuthResponse, FullProfile, Profile } from '../../../model/types/auth';

export const userFreeCredentials = {
	username: 'user-free@yeahub.ru',
	password: 'Password123!',
} as const;

const userFreeCity =
	'123456789012345678990123111123845678901234567890123111123456789012345678901231111234567890123456789012311112345678901234567890123111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111';

const userFreeUserRoles = [userRolesMock.find((role) => role.id === 6)!];

const userFreeUser = {
	id: '3ee85b3d-0c09-4a55-bdf1-f6a55ab1c3ee',
	username: 'yuzerbesplatnyj',
	telegramUsername: null,
	country: '',
	city: userFreeCity,
	email: userFreeCredentials.username,
	birthday: null,
	address: '',
	avatarUrl:
		'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/users_avatars/559d3df3-f179-4d43-8260-655fbf298ec2',
	createdAt: '2025-02-20T08:03:36.468Z',
	isVerified: true,
	userRoles: userFreeUserRoles,
};

const userFreeProfiles: Profile[] = [
	{
		id: 'bd902e81-856a-4a49-8a21-8bc60e17fbc6',
		profileType: 1,
		specializationId: 26,
		markingWeight: 1,
		description: '<p>lj</p>',
		socialNetwork: [
			{ code: 'instagram', title: 'ilay121112211118999' },
			{ code: 'linkedin', title: 'ilay4327wd3' },
			{ code: 'twitter', title: 'ilay132' },
			{
				code: 'facebook',
				title:
					'1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111131111111111111111111111111111111111111111111',
			},
			{ code: 'github', title: 'ilay1343' },
			{ code: 'behance', title: 'Behance2' },
			{ code: 'whatsapp', title: 'WhatsAppы' },
			{ code: 'telegram', title: 'ilay321' },
			{ code: 'youtube', title: 'ilay2211' },
		],
		image_src: '',
		links: [],
		isActive: false,
		profileSkills: [skillsMock[6]],
	},
	{
		id: 'eb27c2e0-b121-4ed8-b167-a24820efae09',
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
		id: '0b6372b8-098c-4501-b991-0f43a983adea',
		profileType: 1,
		specializationId: 29,
		markingWeight: 1,
		description: '',
		socialNetwork: [],
		image_src: '',
		links: [],
		isActive: false,
		profileSkills: [],
	},
	{
		id: '0484ebbe-9380-48a8-b3d2-ec72703b7d4f',
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
	{
		id: '05aeffd8-a727-4ac4-8e18-c1f506ecd110',
		profileType: 1,
		specializationId: 25,
		markingWeight: 1,
		description: '',
		socialNetwork: [],
		image_src: '',
		links: [],
		isActive: false,
		profileSkills: [],
	},
	{
		id: 'a265ea24-4452-4724-b7f0-adfd1a2b3a3b',
		profileType: 1,
		specializationId: 19,
		markingWeight: 1,
		description: '',
		socialNetwork: [],
		image_src: '',
		links: [],
		isActive: false,
		profileSkills: [skillsMock[1]],
	},
];

const userFreeActiveProfile = userFreeProfiles.find((profile) => profile.isActive)!;

const userFreeSubscriptions: FullProfile['subscriptions'] = [
	{
		id: '52fcc3d0-3a28-4c3c-bf1f-8c11f0768ec6',
		createDate: '2026-05-20T07:01:17.044Z',
		endDate: '2026-03-15T00:00:01.178Z',
		subscriptionId: 3,
		userId: userFreeUser.id,
		state: 'inactive',
		subscription: {
			id: '3',
			name: 'Участник сообщества',
			pricePerMonth: 800,
			roles: [{ id: '7', name: 'candidate-premium', permissions: [] }],
		},
	},
	{
		id: 'fff17b0a-e06c-4dbb-851f-4b767958791c',
		createDate: '2025-11-14T14:56:04.702Z',
		endDate: '2026-01-15T00:00:12.090Z',
		subscriptionId: 2,
		userId: userFreeUser.id,
		state: 'inactive',
		subscription: {
			id: '2',
			name: 'Базовая',
			pricePerMonth: 200,
			roles: [
				{
					id: '2',
					name: 'candidate',
					permissions: [
						{ id: '6', name: 'View vacancies' },
						{ id: '3', name: 'Edit own profile' },
						{ id: '2', name: 'View candidates list/profile' },
						{ id: '1', name: 'View members list/profile' },
					],
				},
			],
		},
	},
	{
		id: 'e3c39131-441d-4893-8df7-875a78100d26',
		createDate: '2025-11-02T23:07:18.214Z',
		endDate: '2025-11-09T23:07:18.210Z',
		subscriptionId: 4,
		userId: userFreeUser.id,
		state: 'inactive',
		subscription: {
			id: '4',
			name: 'Пробная',
			pricePerMonth: 0,
			roles: [{ id: '7', name: 'candidate-premium', permissions: [] }],
		},
	},
];

export const userFreeAuthMockResponse: AuthResponse = {
	access_token:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXItZnJlZUB5ZWFodWIucnUiLCJzdWIiOiIzZWU4NWIzZC0wYzA5LTRhNTUtYmRmMS1mNmE1NWFiMWMzZWUiLCJpYXQiOjE3Nzk3MjE1MDEsImV4cCI6MTc3OTgwNzkwMX0.0Xm-GIfzhd5fBwPIi2b47S1p7-ObT1JxF7W9nE4PBco',
	user: {
		...userFreeUser,
		updatedAt: '2026-05-24T15:59:52.095Z',
		subscriptions: [],
	},
};

export const userFreeProfileMockResponse: FullProfile = {
	...userFreeUser,
	updatedAt: '2026-05-25T15:05:01.838Z',
	profiles: userFreeProfiles,
	activeProfile: userFreeActiveProfile,
	subscriptions: userFreeSubscriptions,
};
