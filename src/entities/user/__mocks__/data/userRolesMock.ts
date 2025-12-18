import { Role } from '@/entities/auth/@x/user';

export const userRolesMock: Role[] = [
	{
		id: 1,
		name: 'guest',
		permissions: [
			{
				id: 1,
				name: 'View members list/profile',
			},
			{
				id: 6,
				name: 'View vacancies',
			},
		],
	},
	{
		id: 2,
		name: 'candidate',
		permissions: [
			{
				id: 1,
				name: 'View members list/profile',
			},
			{
				id: 2,
				name: 'View candidates list/profile',
			},
			{
				id: 3,
				name: 'Edit own profile',
			},
			{
				id: 6,
				name: 'View vacancies',
			},
		],
	},
	{
		id: 3,
		name: 'member',
		permissions: [
			{
				id: 1,
				name: 'View members list/profile',
			},
			{
				id: 2,
				name: 'View candidates list/profile',
			},
			{
				id: 3,
				name: 'Edit own profile',
			},
			{
				id: 6,
				name: 'View vacancies',
			},
			{
				id: 8,
				name: 'Edit user rate',
			},
			{
				id: 9,
				name: 'Add articles/blog',
			},
			{
				id: 10,
				name: 'Edit own articles/blog',
			},
		],
	},
	{
		id: 4,
		name: 'admin',
		permissions: [
			{
				id: 1,
				name: 'View members list/profile',
			},
			{
				id: 2,
				name: 'View candidates list/profile',
			},
			{
				id: 3,
				name: 'Edit own profile',
			},
			{
				id: 4,
				name: 'Edit user profiles',
			},
			{
				id: 5,
				name: 'Add (edit own) vacancy',
			},
			{
				id: 6,
				name: 'View vacancies',
			},
			{
				id: 7,
				name: 'Edit user roles',
			},
			{
				id: 8,
				name: 'Edit user rate',
			},
			{
				id: 9,
				name: 'Add articles/blog',
			},
			{
				id: 10,
				name: 'Edit own articles/blog',
			},
			{
				id: 11,
				name: 'Edit user articles/blog',
			},
			{
				id: 12,
				name: 'Edit system dictionaries',
			},
		],
	},
	{
		id: 5,
		name: 'HR',
		permissions: [
			{
				id: 1,
				name: 'View members list/profile',
			},
			{
				id: 5,
				name: 'Add (edit own) vacancy',
			},
		],
	},
	{
		id: 8,
		name: 'author',
		permissions: [],
	},
	{
		id: 6,
		name: 'candidate-free',
		permissions: [],
	},
	{
		id: 7,
		name: 'candidate-premium',
		permissions: [],
	},
];
