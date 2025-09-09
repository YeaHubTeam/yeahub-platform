import { MyResource } from '@/entities/resource';

export const myResourcesMock: MyResource[] = [
	{
		id: 'a26208c7-8b7b-4cfe-b877-67d85076a570',
		userId: '7f9313cb-b4ad-442d-8b5d-9331779e70a2',
		requestPayload: {
			name: 'New Course on Python',
			iconBase64: 'data:image/png;base64,...',
			description: 'A new Python course',
			keywords: ['python', 'course', 'programming'],
			url: 'https://example.com/course',
			type: 'course',
			imageSrc: 'https://example.com/image.png',
		},
		status: 'pending',
		createdAt: '2025-09-09T11:55:03.719Z',
		reviewedAt: null,
		reviewedBy: null,
		specializations: [
			{
				id: 1,
				title: 'React',
				description: 'React разработчик',
				imageSrc: 'http://example.com/image.jpg',
				createdAt: '2024-12-10T10:00:00.000Z',
				updatedAt: '2024-12-10T10:00:00.000Z',
			},
		],
		skills: [
			{
				id: 13,
				title: 'JAVA',
				description: 'Very nice',
				imageSrc: 'string',
				createdAt: '2024-04-21T13:58:30.398Z',
				updatedAt: '2024-04-21T14:56:02.499Z',
			},
		],
	},
];
