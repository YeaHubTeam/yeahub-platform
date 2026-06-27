import { skillsMock } from '@/entities/skill/@x/auth';
import { adminUser } from '@/entities/user/@x/auth';

import { AuthResponse, FullProfile, Profile } from '../../../model/types/auth';

const adminProfiles: Profile[] = [
	{
		id: 'a1525025-4f6b-426e-9917-0d0ac956de9d',
		profileType: 1,
		specializationId: 19,
		markingWeight: 1,
		description: '<p>123</p>',
		socialNetwork: [
			{ code: 'linkedin', title: 'linkedin' },
			{ code: 'twitter', title: 'twitter' },
			{ code: 'facebook', title: 'facebook' },
			{ code: 'github', title: 'github' },
			{ code: 'behance', title: 'behance' },
			{ code: 'whatsapp', title: 'whatsapp' },
			{ code: 'telegram', title: 'telegram' },
			{ code: 'youtube', title: 'youtube' },
		],
		image_src: '',
		links: [],
		isActive: false,
		profileSkills: [skillsMock[4], skillsMock[5]],
	},
	{
		id: 'ffe99430-4ac2-40df-9e6b-4f5f8909748c',
		profileType: 1,
		specializationId: 11,
		markingWeight: 1,
		description: '',
		socialNetwork: [
			{ code: 'instagram', title: 'instagram' },
			{ code: 'linkedin', title: 'linkedin' },
			{ code: 'twitter', title: 'twitter' },
			{ code: 'facebook', title: 'facebook' },
			{ code: 'github', title: 'github' },
			{ code: 'behance', title: 'behance' },
			{ code: 'whatsapp', title: 'whatsapp' },
			{ code: 'telegram', title: 'telegram' },
			{ code: 'youtube', title: 'youtube' },
		],
		image_src: '',
		links: [],
		isActive: true,
		profileSkills: [skillsMock[0], skillsMock[1], skillsMock[2]],
	},
];

const adminActiveProfile = adminProfiles.find((profile) => profile.isActive)!;

const adminSubscriptions: FullProfile['subscriptions'] = [
	{
		id: '54c80f42-0f99-46ba-975e-755462b80c11',
		createDate: '2026-05-24T10:19:22.503Z',
		endDate: '2025-10-04T14:51:11.315Z',
		subscriptionId: 3,
		userId: adminUser.id,
		state: 'inactive',
		subscription: {
			id: '3',
			name: 'Участник сообщества',
			pricePerMonth: 800,
			roles: [{ id: '7', name: 'candidate-premium', permissions: [] }],
		},
	},
	{
		id: '374fcafb-6595-4282-80fb-1360fff2160c',
		createDate: '2026-05-24T10:11:20.780Z',
		subscriptionId: 6,
		userId: adminUser.id,
		state: 'inactive',
		subscription: {
			id: '6',
			name: 'Премиум на 3 месяца',
			pricePerMonth: 400,
			roles: [{ id: '7', name: 'candidate-premium', permissions: [] }],
		},
	},
	{
		id: '46539294-3124-4efe-be2a-790f2e9879ed',
		createDate: '2025-11-14T14:45:22.630Z',
		subscriptionId: 2,
		userId: adminUser.id,
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
						{ id: '3', name: 'Edit own profile' },
						{ id: '1', name: 'View members list/profile' },
						{ id: '2', name: 'View candidates list/profile' },
						{ id: '6', name: 'View vacancies' },
					],
				},
			],
		},
	},
	{
		id: 'ea66033d-bb95-4902-9b46-8324bea6c702',
		createDate: '2025-07-07T09:31:06.072Z',
		endDate: '2025-08-07T18:20:09.228Z',
		subscriptionId: 1,
		userId: adminUser.id,
		state: 'active',
		subscription: {
			id: '1',
			name: 'Кандидат',
			pricePerMonth: 0,
			roles: [{ id: '6', name: 'candidate-free', permissions: [] }],
		},
	},
	{
		id: '3fcc20e9-70ab-4628-b646-1170abd57cfa',
		createDate: '2025-06-20T20:56:41.458Z',
		endDate: '2025-08-04T00:00:00.000Z',
		subscriptionId: 4,
		userId: adminUser.id,
		state: 'inactive',
		subscription: {
			id: '4',
			name: 'Пробная',
			pricePerMonth: 0,
			roles: [{ id: '7', name: 'candidate-premium', permissions: [] }],
		},
	},
];

export const adminAuthMockResponse: AuthResponse = {
	access_token:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQHllYWh1Yi5ydSIsInN1YiI6IjdkMGY4ZjU4LTk4N2UtNDgyYS05MTNkLWUxYzQyOWQyZDg0MiIsImlhdCI6MTc3OTcyMTg0MywiZXhwIjoxNzc5ODA4MjQzfQ.CowNQbU1n09seuWupS9A7FnIHmqZ3iHiqumQgmvkXzc',
	user: {
		...adminUser,
		updatedAt: '2026-05-25T14:51:14.282Z',
		subscriptions: [],
	},
};

export const adminProfileMockResponse: FullProfile = {
	...adminUser,
	updatedAt: '2026-05-25T15:10:43.173Z',
	profiles: adminProfiles,
	activeProfile: adminActiveProfile,
	subscriptions: adminSubscriptions,
};
