import { PopularSkillsResponse } from '@/entities/analytics/model/types/analytics';

export const popularSkillsMockResponse: PopularSkillsResponse = {
	page: 1,
	limit: 10,
	total: 2,
	data: [
		{
			id: 1,
			skill: {
				id: 13,
				title: 'JAVA',
				description: 'Very nice',
				imageSrc: 'https://cdn.example.com/java.png',
				createdAt: '2024-04-21T13:58:30.398Z',
				updatedAt: '2024-04-21T14:56:02.499Z',
			},
			calculatedAt: '2024-12-12T19:16:34.726Z',
			frequencyStat: 42,
		},
		{
			id: 2,
			skill: {
				id: 14,
				title: 'React',
				description: 'Frontend framework',
				imageSrc: 'https://cdn.example.com/react.png',
				createdAt: '2024-03-11T09:11:00.000Z',
				updatedAt: '2024-04-10T12:20:15.000Z',
			},
			calculatedAt: '2024-12-13T09:22:14.123Z',
			frequencyStat: 67,
		},
	],
};
