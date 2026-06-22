import { FullProfile } from '@/entities/auth/@x/user';

export const usersMock: FullProfile[] = [
	{
		id: '7d0f8f58-987e-482a-913d-e1c429d2d842',
		username: 'user',
		country: 'AGroba',
		city: 'Bag-dad',
		email: 'user@example.com',
		telegramUsername: 'troll',
		birthday: '1990-01-01T00:00:00.000Z',
		address: 'улица Пушкина дом Колотушкина',
		avatarUrl: 'https://cdn.fastcup.net/logos/teams/20989_7n1la213o.png',
		createdAt: '2024-05-19T13:38:35.481Z',
		updatedAt: '2024-09-09T04:01:39.385Z',
		subscriptions: [],
		userRoles: [{ id: 4, name: 'admin', permissions: [] }],
		profiles: [],
		activeProfile: {
			id: '03499949-5ba6-44fd-8600-3edd5cf88f68',
			specializationId: 11,
			profileType: 1,
			profileSkills: [],
			description: '',
			image_src: '',
			links: [],
			markingWeight: 1,
			socialNetwork: [],
			isActive: true,
		},
		isVerified: true,
	},
];
