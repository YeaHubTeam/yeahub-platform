import { AuthResponse } from '../../../model/types/auth';

export const authMockResponse: AuthResponse = {
	access_token:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJAZXhhbXBsZS5jb20iLCJzdWIiOiIxZTJhYzliNi1jODdkLTRjOWYtOGE4MC04MmY1ZmJiZjJhMWQiLCJpYXQiOjE3MjU4NTQ4NjQsImV4cCI6MTcyNTk0MTI2NH0.bB4avnjaHkYtK1DrDN8d7q1VhIumPWMdW9azHDaL9_g',
	user: {
		id: '1e2ac9b6-c87d-4c9f-8a80-82f5fbbf2a1d',
		username: 'user',
		email: 'user@example.com',
		telegram: 'troll',
		country: 'AGroba',
		city: 'Bag-dad',
		birthday: '1990-01-01T00:00:00.000Z',
		address: 'улица Пушкина дом Колотушкина',
		avatarUrl: 'https://cdn.fastcup.net/logos/teams/20989_7n1la213o.png',
		createdAt: '',
		updatedAt: '',
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
		isVerified: true,
	},
};
