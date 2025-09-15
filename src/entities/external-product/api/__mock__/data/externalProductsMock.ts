// entities/external-product/api/__mocks__/data/externalProductsMock.ts
import { Response } from '@/shared/types/types';

import { ExternalProduct } from '../../../model/types/externalProduct';

// Убедитесь что все id являются string
const mockProducts: ExternalProduct[] = [
	{
		id: '1', // ← обязательно string!
		name: 'React Course for Beginners',
		description: 'Learn React from scratch with this comprehensive course',
		type: { code: 'approved', description: 'Одобрено' },
		url: 'https://example.com/react-course',
		keywords: ['react', 'javascript', 'frontend', 'web'],
		specializations: [
			{
				id: 1,
				title: 'Frontend',
				description: 'Frontend development',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		skills: [
			{
				id: 1,
				title: 'React',
				description: 'React framework',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		createdById: 'user-1',
		createdAt: '2024-01-01T10:00:00.000Z',
		updatedAt: '2024-01-01T10:00:00.000Z',
	},
	{
		id: '2', // ← обязательно string!
		name: 'eginners',
		description: 'Learn React from scratch with this comprehensive course',
		type: { code: 'rejected', description: 'Отклонено' },
		url: 'https://example.com/react-course',
		keywords: ['react', 'javascript', 'frontend', 'web'],
		specializations: [
			{
				id: 2,
				title: 'Frontend',
				description: 'Frontend development',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		skills: [
			{
				id: 2,
				title: 'React',
				description: 'React framework',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		createdById: 'user-2',
		createdAt: '2024-01-01T10:00:00.000Z',
		updatedAt: '2024-01-01T10:00:00.000Z',
	},
	{
		id: '3', // ← обязательно string!
		name: 'React Course',
		description: 'Learn React from scratch with this comprehensive course',
		type: { code: 'approved', description: 'Одобрено' },
		url: 'https://example.com/react-course',
		keywords: ['react', 'javascript', 'frontend', 'web'],
		specializations: [
			{
				id: 3,
				title: 'Frontend',
				description: 'Frontend development',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		skills: [
			{
				id: 3,
				title: 'React',
				description: 'React framework',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		createdById: 'user-3',
		createdAt: '2024-01-01T10:00:00.000Z',
		updatedAt: '2024-01-01T10:00:00.000Z',
	},
	{
		id: '4', // ← обязательно string!
		name: 'js',
		description: 'Learn React from scratch with this comprehensive course',
		type: { code: 'review', description: 'на ревью' },
		url: 'https://example.com/react-course',
		keywords: ['react', 'javascript', 'frontend', 'web'],
		specializations: [
			{
				id: 4,
				title: 'Frontend',
				description: 'Frontend development',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		skills: [
			{
				id: 4,
				title: 'React',
				description: 'React framework',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		createdById: 'user-4',
		createdAt: '2024-01-01T10:00:00.000Z',
		updatedAt: '2024-01-01T10:00:00.000Z',
	},
	{
		id: '1', // ← обязательно string!
		name: 'ts',
		description: 'Learn React from scratch with this comprehensive course',
		type: { code: 'approved', description: 'Одобрено' },
		url: 'https://example.com/react-course',
		keywords: ['react', 'javascript', 'frontend', 'web'],
		specializations: [
			{
				id: 1,
				title: 'Frontend',
				description: 'Frontend development',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		skills: [
			{
				id: 1,
				title: 'React',
				description: 'React framework',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		createdById: 'user-1',
		createdAt: '2024-01-01T10:00:00.000Z',
		updatedAt: '2024-01-01T10:00:00.000Z',
	},
	{
		id: '1', // ← обязательно string!
		name: 'redux',
		description: 'Learn React from scratch with this comprehensive course',
		type: { code: 'approved', description: 'Одобрено' },
		url: 'https://example.com/react-course',
		keywords: ['react', 'javascript', 'frontend', 'web'],
		specializations: [
			{
				id: 1,
				title: 'Frontend',
				description: 'Frontend development',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		skills: [
			{
				id: 1,
				title: 'React',
				description: 'React framework',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		createdById: 'user-1',
		createdAt: '2024-01-01T10:00:00.000Z',
		updatedAt: '2024-01-01T10:00:00.000Z',
	},
	{
		id: '1', // ← обязательно string!
		name: 'redux',
		description: 'Learn React from scratch with this comprehensive course',
		type: { code: 'approved', description: 'Одобрено' },
		url: 'https://example.com/react-course',
		keywords: ['react', 'javascript', 'frontend', 'web'],
		specializations: [
			{
				id: 1,
				title: 'Frontend',
				description: 'Frontend development',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		skills: [
			{
				id: 1,
				title: 'React',
				description: 'React framework',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		createdById: 'user-1',
		createdAt: '2024-01-01T10:00:00.000Z',
		updatedAt: '2024-01-01T10:00:00.000Z',
	},
	{
		id: '1', // ← обязательно string!
		name: 'redux',
		description: 'Learn React from scratch with this comprehensive course',
		type: { code: 'approved', description: 'Одобрено' },
		url: 'https://example.com/react-course',
		keywords: ['react', 'javascript', 'frontend', 'web'],
		specializations: [
			{
				id: 1,
				title: 'Frontend',
				description: 'Frontend development',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		skills: [
			{
				id: 1,
				title: 'React',
				description: 'React framework',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		createdById: 'user-1',
		createdAt: '2024-01-01T10:00:00.000Z',
		updatedAt: '2024-01-01T10:00:00.000Z',
	},
	{
		id: '1', // ← обязательно string!
		name: 'redux',
		description: 'Learn React from scratch with this comprehensive course',
		type: { code: 'approved', description: 'Одобрено' },
		url: 'https://example.com/react-course',
		keywords: ['react', 'javascript', 'frontend', 'web'],
		specializations: [
			{
				id: 1,
				title: 'Frontend',
				description: 'Frontend development',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		skills: [
			{
				id: 1,
				title: 'React',
				description: 'React framework',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		createdById: 'user-1',
		createdAt: '2024-01-01T10:00:00.000Z',
		updatedAt: '2024-01-01T10:00:00.000Z',
	},
	{
		id: '1', // ← обязательно string!
		name: 'redux',
		description: 'Learn React from scratch with this comprehensive course',
		type: { code: 'approved', description: 'Одобрено' },
		url: 'https://example.com/react-course',
		keywords: ['react', 'javascript', 'frontend', 'web'],
		specializations: [
			{
				id: 1,
				title: 'Frontend',
				description: 'Frontend development',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		skills: [
			{
				id: 1,
				title: 'React',
				description: 'React framework',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		createdById: 'user-1',
		createdAt: '2024-01-01T10:00:00.000Z',
		updatedAt: '2024-01-01T10:00:00.000Z',
	},
	{
		id: '1', // ← обязательно string!
		name: 'redux',
		description: 'Learn React from scratch with this comprehensive course',
		type: { code: 'approved', description: 'Одобрено' },
		url: 'https://example.com/react-course',
		keywords: ['react', 'javascript', 'frontend', 'web'],
		specializations: [
			{
				id: 1,
				title: 'Frontend',
				description: 'Frontend development',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		skills: [
			{
				id: 1,
				title: 'React',
				description: 'React framework',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		createdById: 'user-1',
		createdAt: '2024-01-01T10:00:00.000Z',
		updatedAt: '2024-01-01T10:00:00.000Z',
	},
	{
		id: '1', // ← обязательно string!
		name: 'redux',
		description: 'Learn React from scratch with this comprehensive course',
		type: { code: 'approved', description: 'Одобрено' },
		url: 'https://example.com/react-course',
		keywords: ['react', 'javascript', 'frontend', 'web'],
		specializations: [
			{
				id: 1,
				title: 'Frontend',
				description: 'Frontend development',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		skills: [
			{
				id: 1,
				title: 'React',
				description: 'React framework',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		createdById: 'user-1',
		createdAt: '2024-01-01T10:00:00.000Z',
		updatedAt: '2024-01-01T10:00:00.000Z',
	},
	{
		id: '1', // ← обязательно string!
		name: 'redux',
		description: 'Learn React from scratch with this comprehensive course',
		type: { code: 'approved', description: 'Одобрено' },
		url: 'https://example.com/react-course',
		keywords: ['react', 'javascript', 'frontend', 'web'],
		specializations: [
			{
				id: 1,
				title: 'Frontend',
				description: 'Frontend development',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		skills: [
			{
				id: 1,
				title: 'React',
				description: 'React framework',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		createdById: 'user-1',
		createdAt: '2024-01-01T10:00:00.000Z',
		updatedAt: '2024-01-01T10:00:00.000Z',
	},
	{
		id: '1', // ← обязательно string!
		name: 'redux',
		description: 'Learn React from scratch with this comprehensive course',
		type: { code: 'approved', description: 'Одобрено' },
		url: 'https://example.com/react-course',
		keywords: ['react', 'javascript', 'frontend', 'web'],
		specializations: [
			{
				id: 1,
				title: 'Frontend',
				description: 'Frontend development',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		skills: [
			{
				id: 1,
				title: 'React',
				description: 'React framework',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		createdById: 'user-1',
		createdAt: '2024-01-01T10:00:00.000Z',
		updatedAt: '2024-01-01T10:00:00.000Z',
	},
	{
		id: '1', // ← обязательно string!
		name: 'redux',
		description: 'Learn React from scratch with this comprehensive course',
		type: { code: 'approved', description: 'Одобрено' },
		url: 'https://example.com/react-course',
		keywords: ['react', 'javascript', 'frontend', 'web'],
		specializations: [
			{
				id: 1,
				title: 'Frontend',
				description: 'Frontend development',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		skills: [
			{
				id: 1,
				title: 'React',
				description: 'React framework',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		createdById: 'user-1',
		createdAt: '2024-01-01T10:00:00.000Z',
		updatedAt: '2024-01-01T10:00:00.000Z',
	},
	{
		id: '1', // ← обязательно string!
		name: 'redux',
		description: 'Learn React from scratch with this comprehensive course',
		type: { code: 'approved', description: 'Одобрено' },
		url: 'https://example.com/react-course',
		keywords: ['react', 'javascript', 'frontend', 'web'],
		specializations: [
			{
				id: 1,
				title: 'Frontend',
				description: 'Frontend development',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		skills: [
			{
				id: 1,
				title: 'React',
				description: 'React framework',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		createdById: 'user-1',
		createdAt: '2024-01-01T10:00:00.000Z',
		updatedAt: '2024-01-01T10:00:00.000Z',
	},
	{
		id: '1', // ← обязательно string!
		name: 'redux',
		description: 'Learn React from scratch with this comprehensive course',
		type: { code: 'approved', description: 'Одобрено' },
		url: 'https://example.com/react-course',
		keywords: ['react', 'javascript', 'frontend', 'web'],
		specializations: [
			{
				id: 1,
				title: 'Frontend',
				description: 'Frontend development',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		skills: [
			{
				id: 1,
				title: 'React',
				description: 'React framework',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		createdById: 'user-1',
		createdAt: '2024-01-01T10:00:00.000Z',
		updatedAt: '2024-01-01T10:00:00.000Z',
	},
	{
		id: '1', // ← обязательно string!
		name: 'redux',
		description: 'Learn React from scratch with this comprehensive course',
		type: { code: 'approved', description: 'Одобрено' },
		url: 'https://example.com/react-course',
		keywords: ['react', 'javascript', 'frontend', 'web'],
		specializations: [
			{
				id: 1,
				title: 'Frontend',
				description: 'Frontend development',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		skills: [
			{
				id: 1,
				title: 'React',
				description: 'React framework',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		createdById: 'user-1',
		createdAt: '2024-01-01T10:00:00.000Z',
		updatedAt: '2024-01-01T10:00:00.000Z',
	},
	{
		id: '1', // ← обязательно string!
		name: 'redux',
		description: 'Learn React from scratch with this comprehensive course',
		type: { code: 'approved', description: 'Одобрено' },
		url: 'https://example.com/react-course',
		keywords: ['react', 'javascript', 'frontend', 'web'],
		specializations: [
			{
				id: 1,
				title: 'Frontend',
				description: 'Frontend development',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		skills: [
			{
				id: 1,
				title: 'React',
				description: 'React framework',
				imageSrc: '',
				createdAt: '2024-01-01',
				updatedAt: '2024-01-01',
			},
		],
		createdById: 'user-1',
		createdAt: '2024-01-01T10:00:00.000Z',
		updatedAt: '2024-01-01T10:00:00.000Z',
	},
];

export const externalProductsMock: Response<ExternalProduct[]> = {
	data: mockProducts,
	page: 1,
	limit: 10,
	total: mockProducts.length,
};
