import { Response } from '@/shared/types/types';

import type { Specialization } from '@/entities/specialization/model/types/specialization';

export const specializationsMock: Response<Specialization[]> = {
	data: [
		{
			createdAt: '2024-12-28T17:11:02.504Z',
			description:
				'это специалист, который занимается созданием и поддержкой серверной части веб-приложений и программного обеспечения на языке Python.',
			id: 79,
			imageSrc: null,
			title: 'Python Backend Developer',
			updatedAt: '2024-12-28T17:11:02.504Z',
		},
		{
			createdAt: '2025-01-06T16:30:15.698Z',
			description: 'Java Backend Developer',
			id: 80,
			imageSrc: null,
			title: 'Java Backend Developer',
			updatedAt: '2025-01-06T16:30:15.698Z',
		},
		{
			createdAt: '2025-01-06T16:30:36.632Z',
			description: 'Golang Backend Developer',
			id: 81,
			imageSrc: null,
			title: 'Golang Backend Developer',
			updatedAt: '2025-01-06T16:30:36.632Z',
		},
		{
			createdAt: '2024-11-01T13:33:07.514Z',
			description: '123124',
			id: 16,
			imageSrc: null,
			title: 'Vue.js',
			updatedAt: '2024-11-01T17:45:23.286Z',
		},
		{
			createdAt: '2024-10-03T09:08:10.605Z',
			description: 'Frontend-разработчик',
			id: 11,
			imageSrc: null,
			title: 'Frontend',
			updatedAt: '2024-11-02T06:46:12.745Z',
		},
		{
			createdAt: '2024-11-02T06:51:02.236Z',
			description: 'artificial intelligence',
			id: 17,
			imageSrc: null,
			title: 'AI',
			updatedAt: '2024-11-02T06:51:37.459Z',
		},
		{
			createdAt: '2024-11-02T06:54:26.066Z',
			description: 'back',
			id: 18,
			imageSrc: null,
			title: 'Backend',
			updatedAt: '2024-11-02T06:54:37.972Z',
		},
	],
	page: 1,
	limit: 10,
	total: 30,
};
