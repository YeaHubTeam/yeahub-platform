import { MostDifficultQuestionsResponse } from '../../../model/types/difficultQuestions';

export const mostDifficultQuestions: MostDifficultQuestionsResponse = {
	id: 1,
	specialization: {
		id: 1,
		title: 'React',
		description: 'React разработчик',
		imageSrc: 'http://example.com/image.jpg',
		createdAt: '2024-12-10T10:00:00.000Z',
		updatedAt: '2024-12-10T10:00:00.000Z',
	},
	calculatedAt: '11.11.11',
	topStat: [
		{
			questionId: 1,
			title: 'Что такое Virtual DOM, и как он работает?',
			answersCount: 82,
			state: 1,
		},
		{
			questionId: 1,
			title: 'Как работает event loop в JavaScript?',
			answersCount: 72,
			state: 1,
		},
		{
			questionId: 1,
			title: 'Что такое Virtual DOM, и как он работает?',
			answersCount: 62,
			state: 1,
		},
		{
			questionId: 1,
			title: 'Как работает event loop в JavaScript?',
			answersCount: 52,
			state: 1,
		},
		{
			questionId: 1,
			title: 'Что такое Virtual DOM, и как он работает?',
			answersCount: 42,
			state: 1,
		},
		{
			questionId: 1,
			title: 'Как работает event loop в JavaScript?',
			answersCount: 32,
			state: 1,
		},
	],
};
