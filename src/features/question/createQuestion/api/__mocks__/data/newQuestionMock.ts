import { CreateQuestionBodyRequest } from '../../../model/types/questionCreateTypes';

export const newQuestionMock = (formData: CreateQuestionBodyRequest, id: number) => {
	return {
		id: id,
		title: formData.title,
		description: formData.description,
		code: null,
		imageSrc: null,
		keywords: formData.keywords,
		longAnswer: formData.longAnswer,
		shortAnswer: formData.shortAnswer,
		status: formData.status,
		rate: formData.rate,
		complexity: formData.complexity,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		createdBy:
			'{"userId":"1e2ac9b6-c87d-4c9f-8a80-82f5fbbf2a1d","firstName":"Guse","lastName":"Kazulin"}',
		updatedBy: null,
		questionSpecializations: [
			{
				id: 11,
				title: 'Frontend',
				description: 'Frontend-разработчик',
				imageSrc: null,
				createdAt: '2024-10-03T09:08:10.605Z',
				updatedAt: '2024-11-02T06:46:12.745Z',
			},
		],
		questionSkills: [
			{
				id: 2,
				title: 'JavaScript',
				description:
					'JavaScript - популярный язык программирования, в основном используемый для создания динамических и интерактивных веб-страниц. Он необходим для разработки интерфейсов веб-приложений.',
				imageSrc: null,
				createdAt: '2024-06-04T13:40:16.610Z',
				updatedAt: '2024-11-01T21:33:13.635Z',
			},
		],
		checksCount: 0,
		isLearned: false,
	};
};
