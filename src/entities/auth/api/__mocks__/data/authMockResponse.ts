import { AuthResponse } from '../../../model/types/auth';

export const authMockResponse: AuthResponse = {
	access_token:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJAZXhhbXBsZS5jb20iLCJzdWIiOiIxZTJhYzliNi1jODdkLTRjOWYtOGE4MC04MmY1ZmJiZjJhMWQiLCJpYXQiOjE3MjU4NTQ4NjQsImV4cCI6MTcyNTk0MTI2NH0.bB4avnjaHkYtK1DrDN8d7q1VhIumPWMdW9azHDaL9_g',
	user: {
		id: '1e2ac9b6-c87d-4c9f-8a80-82f5fbbf2a1d',
		firstName: 'Guse',
		lastName: 'Kazulin',
		email: 'user@example.com',
		country: 'AGroba',
		city: 'Bag-dad',
		birthday: '1990-01-01T00:00:00.000Z',
		address: 'улица Пушкина дом Колотушкина',
		avatarUrl: 'https://cdn.fastcup.net/logos/teams/20989_7n1la213o.png',
		createdAt: '',
		updatedAt: '',
		userRoles: [{ id: 4, name: 'admin', permissions: [] }],
		isEmailVerified: true,
	},
};
