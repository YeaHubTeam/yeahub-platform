import {
	authMockAuthorsByAccessToken,
	adminAuthMockResponse,
	authorAuthMockResponse,
} from '@/entities/auth/@x/specialization';

import { Specialization } from '../../../model/types/specialization';

export const specializationsMock: Specialization[] = [
	{
		id: 19,
		title: 'Python Backend Developer',
		slug: 'python-developer',
		description:
			'это специалист, который занимается созданием и поддержкой серверной части веб-приложений и программного обеспечения на языке Python.',
		imageSrc: null,
		createdAt: '2024-12-07T18:52:21.327Z',
		updatedAt: '2024-12-07T18:52:21.327Z',
		createdBy: authMockAuthorsByAccessToken[adminAuthMockResponse.access_token],
	},
	{
		id: 20,
		title: 'Java Backend Developer',
		slug: 'java-backend-developer',
		description:
			'Это специалист, который разрабатывает серверные приложения на языке Java с использованием фреймворков, таких как Spring Framework',
		imageSrc: null,
		createdAt: '2024-12-07T18:53:51.891Z',
		updatedAt: '2024-12-07T18:53:51.891Z',
		createdBy: authMockAuthorsByAccessToken[authorAuthMockResponse.access_token],
	},
	{
		id: 21,
		title: 'Node.js Backend Developer',
		slug: 'nodejs-backend-developer',
		description:
			'Это специалист, который разрабатывает серверные приложения и сервисы с использованием платформы Node.js.',
		imageSrc: null,
		createdAt: '2024-12-07T19:06:16.704Z',
		updatedAt: '2024-12-07T19:06:16.704Z',
		createdBy: authMockAuthorsByAccessToken[adminAuthMockResponse.access_token],
	},
	{
		id: 23,
		title: 'Golang Backend Developer',
		slug: 'golang-backend-developer',
		description:
			'Бэкенд-разработчик на Golang специализируется на создании серверной части приложений, используя язык программирования Go, известный своей эффективностью и простотой синтаксиса',
		imageSrc: null,
		createdAt: '2024-12-12T08:19:06.225Z',
		updatedAt: '2024-12-12T08:19:06.225Z',
		createdBy: authMockAuthorsByAccessToken[authorAuthMockResponse.access_token],
	},
	{
		id: 11,
		title: 'React Frontend Developer',
		slug: 'react-frontend-developer',
		description:
			'React-разработчик — это инженер-программист или веб-разработчик, который занимается фронтендом или дизайном пользовательских интерфейсов, используя библиотеку React',
		imageSrc: null,
		createdAt: '2024-10-03T09:08:10.605Z',
		updatedAt: '2024-12-13T15:29:16.935Z',
		createdBy: authMockAuthorsByAccessToken[adminAuthMockResponse.access_token],
	},
	{
		id: 24,
		title: 'PHP Backend Developer',
		slug: 'php-backend-developer',
		description:
			'PHP-разработчик – это специалист, который пишет код на языке программирования, предназначенном для разработки сайтов и веб-приложений.',
		imageSrc: null,
		createdAt: '2024-12-13T15:31:35.357Z',
		updatedAt: '2024-12-13T15:31:35.357Z',
		createdBy: authMockAuthorsByAccessToken[authorAuthMockResponse.access_token],
	},
	{
		id: 25,
		title: 'Ruby Backend Developer',
		slug: 'ruby-backend-developer',
		description:
			'Программисты Ruby (Ruby Developers) создают сервисную часть сайтов, корпоративные приложения, высоконагруженное программное обеспечение на языке общего назначения Ruby',
		imageSrc: null,
		createdAt: '2024-12-13T15:32:58.103Z',
		updatedAt: '2024-12-13T15:32:58.103Z',
		createdBy: authMockAuthorsByAccessToken[adminAuthMockResponse.access_token],
	},
	{
		id: 26,
		title: 'iOS Mobile Developer',
		slug: 'ios-mobile-developer',
		description:
			'iOS-разработчик — это программист, который создаёт и поддерживает различные приложения для операционной системы iOS.',
		imageSrc: null,
		createdAt: '2024-12-13T15:33:33.443Z',
		updatedAt: '2024-12-13T15:33:33.443Z',
		createdBy: authMockAuthorsByAccessToken[authorAuthMockResponse.access_token],
	},
	{
		id: 27,
		title: 'Android Mobile Developer',
		slug: 'android-mobile-developer',
		description:
			'Android-developer или андроид-разработчик — программист, который создает программное обеспечение (ПО) для операционной системы Android.',
		imageSrc: null,
		createdAt: '2024-12-13T15:34:12.455Z',
		updatedAt: '2024-12-13T15:34:12.455Z',
		createdBy: authMockAuthorsByAccessToken[adminAuthMockResponse.access_token],
	},
	{
		id: 28,
		title: 'Rust Backend Developer',
		slug: 'rust-backend-developer',
		description:
			'Rust-разработчик — это специалист, который занимается разработкой софта с использованием языка Rust. Его часто всего применяют в backend-разработке',
		imageSrc: null,
		createdAt: '2024-12-13T15:35:50.181Z',
		updatedAt: '2024-12-13T15:35:50.181Z',
		createdBy: authMockAuthorsByAccessToken[authorAuthMockResponse.access_token],
	},
	{
		id: 29,
		title: 'QA Engineer',
		slug: 'qa-engineer',
		description:
			'QA-тестировщик или инженер по тестированию (QA-engineer) — это специалист, который создаёт сценарии тестирования, прогнозирует сбои и находит ошибки в продуктах.',
		imageSrc: null,
		createdAt: '2024-12-13T15:37:18.095Z',
		updatedAt: '2024-12-13T15:37:18.095Z',
		createdBy: authMockAuthorsByAccessToken[adminAuthMockResponse.access_token],
	},
];
