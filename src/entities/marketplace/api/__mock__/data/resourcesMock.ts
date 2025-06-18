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
		url: 'https://coderunner.io/git-guide',
		image: 'https://coderunner.io/img/git-guide-thumb.png',
	},
	{
		id: 'rest-vs-graphql',
		title: 'REST vs GraphQL: что выбрать и когда?',
		description: 'Плюсы, минусы, советы по применению для начинающих разработчиков.',
		url: 'https://coderunner.io/rest-vs-graphql',
		image: null,
	},
];
