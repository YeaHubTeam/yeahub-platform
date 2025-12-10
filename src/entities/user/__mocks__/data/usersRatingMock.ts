import type {
	Specialization,
	UserRating,
	UsersRatingBySpecialization,
} from '../../model/types/usersRating';

const specializations: Specialization[] = [
	{
		id: 19,
		title: 'Python Backend Developer',
		description:
			'это специалист, который занимается созданием и поддержкой серверной части веб-приложений и программного обеспечения на языке Python.',
		imageSrc: null,
		createdAt: '2024-12-07T18:52:21.327Z',
		updatedAt: '2024-12-07T18:52:21.327Z',
	},
	{
		id: 20,
		title: 'Java Backend Developer',
		description:
			'Это специалист, который разрабатывает серверные приложения на языке Java с использованием фреймворков, таких как Spring Framework',
		imageSrc: null,
		createdAt: '2024-12-07T18:53:51.891Z',
		updatedAt: '2024-12-07T18:53:51.891Z',
	},
	{
		id: 21,
		title: 'Node.js Backend Developer',
		description:
			'Это специалист, который разрабатывает серверные приложения и сервисы с использованием платформы Node.js.',
		imageSrc: null,
		createdAt: '2024-12-07T19:06:16.704Z',
		updatedAt: '2024-12-07T19:06:16.704Z',
	},
	{
		id: 23,
		title: 'Golang Backend Developer',
		description:
			'Бэкенд-разработчик на Golang специализируется на создании серверной части приложений, используя язык программирования Go, известный своей эффективностью и простотой синтаксиса',
		imageSrc: null,
		createdAt: '2024-12-12T08:19:06.225Z',
		updatedAt: '2024-12-12T08:19:06.225Z',
	},
	{
		id: 11,
		title: 'React Frontend Developer',
		description:
			'React-разработчик — это инженер-программист или веб-разработчик, который занимается фронтендом или дизайном пользовательских интерфейсов, используя библиотеку React',
		imageSrc: null,
		createdAt: '2024-10-03T09:08:10.605Z',
		updatedAt: '2024-12-13T15:29:16.935Z',
	},
	{
		id: 24,
		title: 'PHP Backend Developer',
		description:
			'PHP-разработчик – это специалист, который пишет код на языке программирования, предназначенном для разработки сайтов и веб-приложений.',
		imageSrc: null,
		createdAt: '2024-12-13T15:31:35.357Z',
		updatedAt: '2024-12-13T15:31:35.357Z',
	},
	{
		id: 25,
		title: 'Ruby Backend Developer',
		description:
			'Программисты Ruby (Ruby Developers) создают сервисную часть сайтов, корпоративные приложения, высоконагруженное программное обеспечение на языке общего назначения Ruby',
		imageSrc: null,
		createdAt: '2024-12-13T15:32:58.103Z',
		updatedAt: '2024-12-13T15:32:58.103Z',
	},
	{
		id: 26,
		title: 'iOS Mobile Developer',
		description:
			'iOS-разработчик — это программист, который создаёт и поддерживает различные приложения для операционной системы iOS.',
		imageSrc: null,
		createdAt: '2024-12-13T15:33:33.443Z',
		updatedAt: '2024-12-13T15:33:33.443Z',
	},
	{
		id: 27,
		title: 'Android Mobile Developer',
		description:
			'Android-developer или андроид-разработчик — программист, который создает программное обеспечение (ПО) для операционной системы Android.',
		imageSrc: null,
		createdAt: '2024-12-13T15:34:12.455Z',
		updatedAt: '2024-12-13T15:34:12.455Z',
	},
	{
		id: 28,
		title: 'Rust Backend Developer',
		description:
			'Rust-разработчик — это специалист, который занимается разработкой софта с использованием языка Rust. Его часто всего применяют в backend-разработке',
		imageSrc: null,
		createdAt: '2024-12-13T15:35:50.181Z',
		updatedAt: '2024-12-13T15:35:50.181Z',
	},
	{
		id: 29,
		title: 'QA Engineer',
		description:
			'QA-тестировщик или инженер по тестированию (QA-engineer) — это специалист, который создаёт сценарии тестирования, прогнозирует сбои и находит ошибки в продуктах.',
		imageSrc: null,
		createdAt: '2024-12-13T15:37:18.095Z',
		updatedAt: '2024-12-13T15:37:18.095Z',
	},
];

const usersRating: UserRating[] = [
	{
		userId: '1',
		username: 'Christopher',
		avatarUrl: 'https://mockmind-api.uifaces.co/content/human/222.jpg',
		ratingScore: 1100,
	},
	{
		userId: '2',
		username: 'Anna',
		avatarUrl: 'http://mockmind-api.uifaces.co/content/human/219.jpg',
		ratingScore: 900,
	},
	{
		userId: '3',
		username: 'Alexander',
		avatarUrl: 'https://mockmind-api.uifaces.co/content/human/80.jpg',
		ratingScore: 700,
	},
];

export const usersRatingMock: UsersRatingBySpecialization[] = specializations.map(
	(specialization) => ({
		specialization,
		questionsCount: 1200,
		users: usersRating,
	}),
);
