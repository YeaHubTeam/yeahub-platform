import { authorUser } from '@/entities/user/@x/auth';

import { AuthResponse, FullProfile, Profile } from '../../../model/types/auth';

const authorProfiles: Profile[] = [
	{
		id: '014c0711-e8bf-493b-9f44-e22bac173c0c',
		profileType: 1,
		specializationId: 23,
		markingWeight: 1,
		description: '',
		socialNetwork: [],
		image_src: '',
		links: [],
		isActive: false,
		profileSkills: [],
	},
	{
		id: '3f73836d-25db-4552-84e2-2476c79370c8',
		profileType: 1,
		specializationId: 21,
		markingWeight: 1,
		description: '',
		socialNetwork: [],
		image_src: '',
		links: [],
		isActive: true,
		profileSkills: [],
	},
];

const authorActiveProfile = authorProfiles.find((profile) => profile.isActive)!;

const authorSubscriptions: FullProfile['subscriptions'] = [
	{
		id: '16296b6c-1202-452b-9314-cf9868480428',
		createDate: '2026-03-01T19:16:31.957Z',
		endDate: '2026-03-08T19:16:31.956Z',
		subscriptionId: 4,
		userId: authorUser.id,
		state: 'inactive',
		subscription: {
			id: '4',
			name: 'Пробная',
			pricePerMonth: 0,
			roles: [{ id: '7', name: 'candidate-premium', permissions: [] }],
		},
	},
];

export const authorAuthMockResponse: AuthResponse = {
	access_token:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImF1dGhvckB5ZWFodWIucnUiLCJzdWIiOiJiMjZkYzRjMy00YTdlLTQ3OWUtYTg1Mi1kMzlkZDg1YmYwOGUiLCJpYXQiOjE3Nzk3MjE3NzMsImV4cCI6MTc3OTgwODE3M30.Gk43gpHRtI4o8qXLyKv1rRXBJ2ZJvuj6aKq07QcDDxs',
	user: {
		...authorUser,
		updatedAt: '2026-05-23T22:26:38.091Z',
		subscriptions: [],
	},
};

export const authorProfileMockResponse: FullProfile = {
	...authorUser,
	updatedAt: '2026-05-25T15:09:33.863Z',
	profiles: authorProfiles,
	activeProfile: authorActiveProfile,
	subscriptions: authorSubscriptions,
};
