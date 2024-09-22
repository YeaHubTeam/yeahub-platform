import { HttpResponse, http } from 'msw';

export default http.get(process.env.API_URL + 'interview-preparation/quizzes/active/:id', () => {
	return HttpResponse.json({
		data: [
			{
				id: 'da717a0a-9363-4bcb-8d99-782b8a6667aa',
				profileId: '03499949-5ba6-44fd-8600-3edd5cf88f68',
				quizNumber: null,
				startDate: null,
				endDate: null,
				fullCount: 3,
				successCount: null,
				skills: ['Машинное обучение', 'Java'],
				response: {
					answers: [
						{
							questionId: 13,
							questionTitle: 'Event Loop112323b1becf97-5288-48b6-b049-192c93cb5301',
						},
						{
							questionId: 14,
							questionTitle: 'Event Loop11112323458e1ffa-b56b-47c4-aa3b-62a5cd21df5a',
						},
						{
							questionId: 15,
							questionTitle: 'Event Loop11112323d87d1b6e-a94a-44ad-a01e-80cfc4d6fd3c',
						},
					],
				},
				questions: [
					{
						id: 14,
						title: 'Event Loop11112323458e1ffa-b56b-47c4-aa3b-62a5cd21df5a',
						description: 'What is Eve222n22t Loop?',
						code: '<div>1</div>',
						imageSrc: null,
						keywords: ['JavaScript'],
						longAnswer: '2+2=4',
						shortAnswer: '2+2=4',
						status: 'draft',
						rate: 2,
						complexity: 4,
						createdAt: '2024-07-02T06:38:01.163Z',
						updatedAt: '2024-07-02T06:38:01.163Z',
						createdBy:
							'{"userId":"1e2ac9b6-c87d-4c9f-8a80-82f5fbbf2a1d","firstName":"Kazulin","lastName":"Kazulin"}',
						updatedBy: null,
						questionSpecializations: [
							{
								id: 1,
								title: 'Java',
								description: 'Java разработчик',
								imageSrc:
									'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/specializations/4317082c-c7c2-47fa-93d0-7b878ab08f3a',
								createdAt: '2024-06-02T07:33:45.033Z',
								updatedAt: '2024-06-06T13:59:08.240Z',
							},
							{
								id: 3,
								title: 'UI/UX',
								description: 'UI/UX разработчик',
								imageSrc: null,
								createdAt: '2024-06-02T07:33:45.033Z',
								updatedAt: '2024-06-02T07:33:45.033Z',
							},
						],
						questionSkills: [
							{
								id: 10,
								title: 'Машинное обучение',
								description:
									'Машинное обучение - подмножество искусственного интеллекта, которое позволяет компьютерам учиться и улучшаться на основе опыта без явного программирования.',
								imageSrc: null,
								createdAt: '2024-06-04T13:40:16.610Z',
								updatedAt: '2024-06-04T13:40:16.610Z',
							},
						],
					},
					{
						id: 15,
						title: 'Event Loop11112323d87d1b6e-a94a-44ad-a01e-80cfc4d6fd3c',
						description: 'What is Eve222n22t Loop?',
						code: '<div>1</div>',
						imageSrc: null,
						keywords: ['JavaScript'],
						longAnswer: '2+2=4',
						shortAnswer: '2+2=4',
						status: 'draft',
						rate: 2,
						complexity: 4,
						createdAt: '2024-07-02T06:38:10.529Z',
						updatedAt: '2024-07-02T06:38:10.529Z',
						createdBy:
							'{"userId":"1e2ac9b6-c87d-4c9f-8a80-82f5fbbf2a1d","firstName":"Kazulin","lastName":"Kazulin"}',
						updatedBy: null,
						questionSpecializations: [
							{
								id: 1,
								title: 'Java',
								description: 'Java разработчик',
								imageSrc:
									'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/specializations/4317082c-c7c2-47fa-93d0-7b878ab08f3a',
								createdAt: '2024-06-02T07:33:45.033Z',
								updatedAt: '2024-06-06T13:59:08.240Z',
							},
							{
								id: 3,
								title: 'UI/UX',
								description: 'UI/UX разработчик',
								imageSrc: null,
								createdAt: '2024-06-02T07:33:45.033Z',
								updatedAt: '2024-06-02T07:33:45.033Z',
							},
						],
						questionSkills: [
							{
								id: 10,
								title: 'Машинное обучение',
								description:
									'Машинное обучение - подмножество искусственного интеллекта, которое позволяет компьютерам учиться и улучшаться на основе опыта без явного программирования.',
								imageSrc: null,
								createdAt: '2024-06-04T13:40:16.610Z',
								updatedAt: '2024-06-04T13:40:16.610Z',
							},
							{
								id: 5,
								title: 'Java',
								description:
									'Java - широко используемый язык программирования, известный своей переносимостью и совместимостью. Обычно используется для разработки мобильных приложений, корпоративного программного обеспечения и крупных веб-приложений.',
								imageSrc: null,
								createdAt: '2024-06-04T13:40:16.610Z',
								updatedAt: '2024-06-04T13:40:16.610Z',
							},
						],
					},
				],
			},
		],
		page: 1,
		limit: 1,
		total: 85,
	});
});
