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
	subscriptions: [
		{
			state: 'active',
			id: 'sub-123',
			subscriptionId: 1001,
			userId: 'user-789',
			createDate: '2024-03-15T10:00:00Z',
			endDate: '2025-03-15T10:00:00Z',
			subscription: {
				id: 'plan-premium',
				name: 'Premium Plan',
				pricePerMonth: 29.99,
				description: 'Full access to all features with priority support',
				roles: [
					{
						id: 'role-admin',
						name: 'Admin',
						permissions: [
							{ id: 'perm-create', name: 'Create Users' },
							{ id: 'perm-delete', name: 'Delete Users' },
							{ id: 'perm-view-analytics', name: 'View Analytics' },
						],
					},
					{
						id: 'role-editor',
						name: 'Editor',
						permissions: [
							{ id: 'perm-create', name: 'Create Users' },
							{ id: 'perm-edit', name: 'Edit Posts' },
						],
					},
				],
			},
		},
	],
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
			isActive: true,
			telegram: null,
		},
	],
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
		telegram: null,
	},
	isVerified: true,
};
