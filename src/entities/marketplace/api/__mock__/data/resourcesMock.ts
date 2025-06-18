import { Resource } from '@/entities/marketplace/model/types/resource';

export const resourcesMock: Resource[] = [
	{
		id: 'a26208c7-8b7b-4cfe-b877-67d85076a570',
		title: 'New Course on Python',
		description: 'A new Python course',
		url: 'https://udemy.com/course/new-python-course',
		image: null,
	},
	{
		id: 'git-guide',
		title: 'Как пользоваться Git: пошаговое руководство',
		description: 'Видео с объяснением init, commit, push, pull и ветвления.',
		url: 'https://coderunner.io/',
		image: null,
	},
	{
		id: 'rest-vs-graphql',
		title: 'Background Fetch API',
		description:
			'When a web application requires the user to download large files, this often presents a problem in that the user needs to stay connected to the page for the download to complete.',
		url: 'https://developer.mozilla.org/en-US/docs/Web/API/Background_Fetch_API',
		image: null,
	},
	{
		id: 'gateway',
		title: 'Паттерны Gateway и Backend-for-Frontend',
		description:
			'Gateway и Backend-for-Frontend (BFF) — паттерны проектирования для разработки веб-приложений. ',
		url: 'https://doka.guide/tools/gateway-bff/',
		image: null,
	},
	{
		id: 'rest-vs-graphql',
		title: 'REST vs GraphQL: что выбрать и когда?',
		description: 'Плюсы, минусы, советы по применению для начинающих разработчиков.',
		url: 'https://coderunner.io/',
		image: null,
	},
];
