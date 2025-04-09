import { FullProfile } from '@/entities/auth';

export const authProfileQueryMockResponse: FullProfile = {
	id: '1e2ac9b6-c87d-4c9f-8a80-82f5fbbf2a1d',
	username: 'user',
	country: 'AGroba',
	city: 'Bag-dad',
	email: 'user@example.com',
	birthday: '1990-01-01T00:00:00.000Z',
	address: 'улица Пушкина дом Колотушкина',
	avatarUrl: 'https://cdn.fastcup.net/logos/teams/20989_7n1la213o.png',
	createdAt: '2024-05-19T13:38:35.481Z',
	updatedAt: '2024-09-09T04:01:39.385Z',
	userRoles: [{ id: 4, name: 'admin', permissions: [] }],
	profiles: [
		{
			id: '03499949-5ba6-44fd-8600-3edd5cf88f68',
			specializationId: 11,
			profileType: 1,
			profileSkills: [],
			description: '',
			image_src: '',
			links: [],
			markingWeight: 1,
			socialNetwork: [],
		},
	],
	isEmailVerified: true,
};
