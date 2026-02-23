import { Response } from '@/shared/libs';

import type { Resource } from '@/entities/resource';

export const resourcesMock: Response<Resource[]> = {
	data: [
		{
			id: '6497a854-b2b4-4caf-8cae-675461ae3b29',
			name: 'EE',
			description: 'test',
			url: 'https://udemy.com/course/new-python-course',
			imageSrc: '',
			createdAt: '2025-08-28T07:22:21.022Z',
			updatedAt: '2025-08-28T07:22:21.022Z',
			keywords: ['test'],
			type: {
				code: 'guide',
				description: 'Гайд',
			},
			createdBy: {
				id: 'dd429b2f-1877-4991-9a42-acdc76418476',
				username: 'Nikitos_228',
			},
			specializations: [
				{
					id: 29,
					title: 'QA Engineer',
					description:
						'QA-тестировщик или инженер по тестированию (QA-engineer) — это специалист, который создаёт сценарии тестирования, прогнозирует сбои и находит ошибки в продуктах.',
					imageSrc: null,
					createdAt: '2024-12-13T15:37:18.095Z',
					updatedAt: '2024-12-13T15:37:18.095Z',
				},
			],
			skills: [
				{
					id: 46,
					title: 'Testing',
					description:
						'процесс проверки программного обеспечения на соответствие требованиям, включающий функциональное, производительное и пользовательское тестирование.',
					imageSrc: null,
					createdAt: '2024-12-23T21:01:28.910Z',
					updatedAt: '2024-12-23T21:01:28.910Z',
				},
			],
		},
		{
			id: 'a89b9475-5240-4fc4-a9ac-030db6c6fa0c',
			name: 'React',
			description: 'Dev',
			url: '',
			imageSrc: '',
			createdBy: {
				id: 'dd429b2f-1877-4991-9a42-acdc76418476',
				username: 'Nikitos_228',
			},
			createdAt: '2025-08-25T12:39:21.261Z',
			updatedAt: '2025-08-25T12:39:21.261Z',
			keywords: ['asdas'],
			type: {
				code: 'video',
				description: 'Видео',
			},
			specializations: [
				{
					id: 40,
					title: 'Desktop Application Developer',
					description:
						'Разработчик настольных приложений – специалист, который создаёт кроссплатформенные или нативные программы для Windows, macOS и Linux.',
					imageSrc: null,
					createdAt: '2025-02-06T18:42:12.680Z',
					updatedAt: '2025-02-06T18:42:12.680Z',
				},
			],
			skills: [
				{
					id: 8,
					title: 'Docker',
					description:
						'Docker - платформа для разработки, доставки и запуска приложений в контейнерах. Обеспечивает эффективный способ упаковки и развертывания программного обеспечения в различных средах.',
					imageSrc:
						'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/skill/f116b975-3065-4a16-9568-d098522247e8',
					createdAt: '2024-06-04T13:40:16.610Z',
					updatedAt: '2025-01-18T19:55:55.824Z',
				},
			],
		},
		{
			id: '710824cc-cc46-4374-90ea-5552f0c41063',
			name: 'JS',
			description: 'JS',
			url: '',
			imageSrc: '',
			createdBy: {
				id: 'dd429b2f-1877-4991-9a42-acdc76418476',
				username: 'Nikitos_228',
			},
			createdAt: '2025-08-25T12:30:00.427Z',
			updatedAt: '2025-08-25T12:30:00.427Z',
			keywords: ['fsa'],
			type: {
				code: 'podcast',
				description: 'Подкаст',
			},
			specializations: [
				{
					id: 40,
					title: 'Desktop Application Developer',
					description:
						'Разработчик настольных приложений – специалист, который создаёт кроссплатформенные или нативные программы для Windows, macOS и Linux.',
					imageSrc: null,
					createdAt: '2025-02-06T18:42:12.680Z',
					updatedAt: '2025-02-06T18:42:12.680Z',
				},
			],
			skills: [
				{
					id: 8,
					title: 'Docker',
					description:
						'Docker - платформа для разработки, доставки и запуска приложений в контейнерах. Обеспечивает эффективный способ упаковки и развертывания программного обеспечения в различных средах.',
					imageSrc:
						'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/skill/f116b975-3065-4a16-9568-d098522247e8',
					createdAt: '2024-06-04T13:40:16.610Z',
					updatedAt: '2025-01-18T19:55:55.824Z',
				},
			],
		},
		{
			id: '1b53d32f-fbb8-43a2-bf63-79ee164e2776',
			name: 'fadf',
			description: 'asides',
			url: '',
			imageSrc: '',
			createdBy: {
				id: 'dd429b2f-1877-4991-9a42-acdc76418476',
				username: 'Nikitos_228',
			},
			createdAt: '2025-08-20T17:39:35.232Z',
			updatedAt: '2025-08-20T17:39:35.232Z',
			keywords: ['dasd'],
			type: {
				code: 'podcast',
				description: 'Подкаст',
			},
			specializations: [
				{
					id: 40,
					title: 'Desktop Application Developer',
					description:
						'Разработчик настольных приложений – специалист, который создаёт кроссплатформенные или нативные программы для Windows, macOS и Linux.',
					imageSrc: null,
					createdAt: '2025-02-06T18:42:12.680Z',
					updatedAt: '2025-02-06T18:42:12.680Z',
				},
			],
			skills: [
				{
					id: 8,
					title: 'Docker',
					description:
						'Docker - платформа для разработки, доставки и запуска приложений в контейнерах. Обеспечивает эффективный способ упаковки и развертывания программного обеспечения в различных средах.',
					imageSrc:
						'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/skill/f116b975-3065-4a16-9568-d098522247e8',
					createdAt: '2024-06-04T13:40:16.610Z',
					updatedAt: '2025-01-18T19:55:55.824Z',
				},
			],
		},
		{
			id: '3ee6770e-7d5c-44a6-92e1-bab6b5758e69',
			name: 'ddda',
			description: 'ads',
			url: '',
			imageSrc: '',
			createdBy: {
				id: 'dd429b2f-1877-4991-9a42-acdc76418476',
				username: 'Nikitos_228',
			},
			createdAt: '2025-08-17T13:22:35.437Z',
			updatedAt: '2025-08-17T13:22:35.437Z',
			keywords: ['qqq'],
			type: {
				code: 'video',
				description: 'Видео',
			},
			specializations: [
				{
					id: 40,
					title: 'Desktop Application Developer',
					description:
						'Разработчик настольных приложений – специалист, который создаёт кроссплатформенные или нативные программы для Windows, macOS и Linux.',
					imageSrc: null,
					createdAt: '2025-02-06T18:42:12.680Z',
					updatedAt: '2025-02-06T18:42:12.680Z',
				},
			],
			skills: [
				{
					id: 8,
					title: 'Docker',
					description:
						'Docker - платформа для разработки, доставки и запуска приложений в контейнерах. Обеспечивает эффективный способ упаковки и развертывания программного обеспечения в различных средах.',
					imageSrc:
						'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/skill/f116b975-3065-4a16-9568-d098522247e8',
					createdAt: '2024-06-04T13:40:16.610Z',
					updatedAt: '2025-01-18T19:55:55.824Z',
				},
			],
		},
		{
			id: '6d15db1c-d505-4bd7-a1d3-c1f286eb54f3',
			name: 'YH-12944',
			description: 'YH-1294',
			url: '',
			imageSrc: '',
			createdBy: {
				id: 'dd429b2f-1877-4991-9a42-acdc76418476',
				username: 'Nikitos_228',
			},
			createdAt: '2025-08-25T12:50:37.827Z',
			updatedAt: '2025-08-26T19:09:47.100Z',
			keywords: ['key'],
			type: {
				code: 'channel',
				description: 'Канал',
			},
			specializations: [
				{
					id: 23,
					title: 'Golang Backend Developer',
					description:
						'Бэкенд-разработчик на Golang специализируется на создании серверной части приложений, используя язык программирования Go, известный своей эффективностью и простотой синтаксиса',
					imageSrc: null,
					createdAt: '2024-12-12T08:19:06.225Z',
					updatedAt: '2024-12-12T08:19:06.225Z',
				},
			],
			skills: [
				{
					id: 7,
					title: 'Git',
					description:
						'Git - система контроля версий, используемая для отслеживания изменений в исходном коде во время разработки программного обеспечения. Позволяет нескольким разработчикам эффективно сотрудничать над проектами.',
					imageSrc:
						'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/skill/9ac5184a-fcef-4a76-ad6f-e299fd2e7366',
					createdAt: '2024-06-04T13:40:16.610Z',
					updatedAt: '2025-01-18T19:43:29.923Z',
				},
			],
		},
		{
			id: '487807ab-0402-4b45-a581-a50341af5bd7',
			name: 'SADdыфв',
			description: 'qweфывф',
			url: '',
			imageSrc: '',
			createdBy: {
				id: 'dd429b2f-1877-4991-9a42-acdc76418476',
				username: 'Nikitos_228',
			},
			createdAt: '2025-08-26T13:41:09.342Z',
			updatedAt: '2025-08-26T14:41:54.786Z',
			keywords: ['ads'],
			type: {
				code: 'channel',
				description: 'Канал',
			},
			specializations: [
				{
					id: 40,
					title: 'Desktop Application Developer',
					description:
						'Разработчик настольных приложений – специалист, который создаёт кроссплатформенные или нативные программы для Windows, macOS и Linux.',
					imageSrc: null,
					createdAt: '2025-02-06T18:42:12.680Z',
					updatedAt: '2025-02-06T18:42:12.680Z',
				},
			],
			skills: [
				{
					id: 7,
					title: 'Git',
					description:
						'Git - система контроля версий, используемая для отслеживания изменений в исходном коде во время разработки программного обеспечения. Позволяет нескольким разработчикам эффективно сотрудничать над проектами.',
					imageSrc:
						'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/skill/9ac5184a-fcef-4a76-ad6f-e299fd2e7366',
					createdAt: '2024-06-04T13:40:16.610Z',
					updatedAt: '2025-01-18T19:43:29.923Z',
				},
				{
					id: 58,
					title: 'C#',
					description:
						'Мощный язык для разработки на платформе .NET, поддерживающий ООП, асинхронность и кроссплатформенность, идеален для веб-сервисов, десктопных приложений и игр на Unity.',
					imageSrc: null,
					createdAt: '2025-02-10T20:13:40.776Z',
					updatedAt: '2025-02-10T20:13:40.776Z',
				},
			],
		},
		{
			id: '6f1f9e1c-d3a3-42af-9770-85f3762ed09b',
			name: 'Example199999',
			description: 'Example123124',
			url: '',
			imageSrc: '',
			createdBy: {
				id: 'dd429b2f-1877-4991-9a42-acdc76418476',
				username: 'Nikitos_228',
			},
			createdAt: '2025-08-26T08:32:51.015Z',
			updatedAt: '2025-08-27T15:25:01.812Z',
			keywords: ['qweq'],
			type: {
				code: 'channel',
				description: 'Канал',
			},
			specializations: [
				{
					id: 40,
					title: 'Desktop Application Developer',
					description:
						'Разработчик настольных приложений – специалист, который создаёт кроссплатформенные или нативные программы для Windows, macOS и Linux.',
					imageSrc: null,
					createdAt: '2025-02-06T18:42:12.680Z',
					updatedAt: '2025-02-06T18:42:12.680Z',
				},
			],
			skills: [
				{
					id: 7,
					title: 'Git',
					description:
						'Git - система контроля версий, используемая для отслеживания изменений в исходном коде во время разработки программного обеспечения. Позволяет нескольким разработчикам эффективно сотрудничать над проектами.',
					imageSrc:
						'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/skill/9ac5184a-fcef-4a76-ad6f-e299fd2e7366',
					createdAt: '2024-06-04T13:40:16.610Z',
					updatedAt: '2025-01-18T19:43:29.923Z',
				},
				{
					id: 58,
					title: 'C#',
					description:
						'Мощный язык для разработки на платформе .NET, поддерживающий ООП, асинхронность и кроссплатформенность, идеален для веб-сервисов, десктопных приложений и игр на Unity.',
					imageSrc: null,
					createdAt: '2025-02-10T20:13:40.776Z',
					updatedAt: '2025-02-10T20:13:40.776Z',
				},
			],
		},
		{
			id: '070adc5d-0483-4be5-99dc-996e796a8077',
			name: '11wrwr',
			description: '111212',
			url: '',
			imageSrc: '',
			createdBy: {
				id: 'dd429b2f-1877-4991-9a42-acdc76418476',
				username: 'Nikitos_228',
			},
			createdAt: '2025-08-27T08:34:44.925Z',
			updatedAt: '2025-08-29T11:27:01.580Z',
			keywords: ['1', '34'],
			type: {
				code: 'channel',
				description: 'Канал',
			},
			specializations: [
				{
					id: 39,
					title: 'System Software Engineer',
					description:
						'Системный программист – специалист, который разрабатывает системное ПО (ОС, драйверы, компиляторы), обеспечивая взаимодействие железа и софта.',
					imageSrc: null,
					createdAt: '2025-02-06T18:41:59.722Z',
					updatedAt: '2025-02-06T18:41:59.722Z',
				},
			],
			skills: [
				{
					id: 50,
					title: 'Networks ',
					description:
						'Инфраструктура передачи данных, обеспечивающая связь, безопасность и масштабируемость между системами и устройствами',
					imageSrc: null,
					createdAt: '2025-01-14T16:57:49.717Z',
					updatedAt: '2025-01-14T16:57:49.717Z',
				},
				{
					id: 54,
					title: 'Bash',
					description:
						'Bash — командный интерпретатор для Unix-подобных систем, позволяющий выполнять команды и писать скрипты.',
					imageSrc: null,
					createdAt: '2025-02-08T09:33:23.206Z',
					updatedAt: '2025-02-08T09:40:47.903Z',
				},
			],
		},
		{
			id: '15cc7562-7d12-45a0-b580-70830d0daa0a',
			name: '12',
			description: '1',
			url: '',
			imageSrc: '',
			createdBy: {
				id: 'dd429b2f-1877-4991-9a42-acdc76418476',
				username: 'Nikitos_228',
			},
			createdAt: '2025-08-27T08:42:58.388Z',
			updatedAt: '2025-08-27T08:42:58.388Z',
			keywords: ['1'],
			type: {
				code: 'video',
				description: 'Видео',
			},
			specializations: [
				{
					id: 39,
					title: 'System Software Engineer',
					description:
						'Системный программист – специалист, который разрабатывает системное ПО (ОС, драйверы, компиляторы), обеспечивая взаимодействие железа и софта.',
					imageSrc: null,
					createdAt: '2025-02-06T18:41:59.722Z',
					updatedAt: '2025-02-06T18:41:59.722Z',
				},
			],
			skills: [
				{
					id: 54,
					title: 'Bash',
					description:
						'Bash — командный интерпретатор для Unix-подобных систем, позволяющий выполнять команды и писать скрипты.',
					imageSrc: null,
					createdAt: '2025-02-08T09:33:23.206Z',
					updatedAt: '2025-02-08T09:40:47.903Z',
				},
			],
		},
		{
			id: '98843fbc-fc59-42db-8798-3796daea67a8',
			name: '1',
			description: '1',
			url: '',
			imageSrc: '',
			createdBy: {
				id: 'dd429b2f-1877-4991-9a42-acdc76418476',
				username: 'Nikitos_228',
			},
			createdAt: '2025-08-27T08:41:35.446Z',
			updatedAt: '2025-08-27T08:41:35.446Z',
			keywords: ['1'],
			type: {
				code: 'video',
				description: 'Видео',
			},
			specializations: [
				{
					id: 39,
					title: 'System Software Engineer',
					description:
						'Системный программист – специалист, который разрабатывает системное ПО (ОС, драйверы, компиляторы), обеспечивая взаимодействие железа и софта.',
					imageSrc: null,
					createdAt: '2025-02-06T18:41:59.722Z',
					updatedAt: '2025-02-06T18:41:59.722Z',
				},
			],
			skills: [
				{
					id: 54,
					title: 'Bash',
					description:
						'Bash — командный интерпретатор для Unix-подобных систем, позволяющий выполнять команды и писать скрипты.',
					imageSrc: null,
					createdAt: '2025-02-08T09:33:23.206Z',
					updatedAt: '2025-02-08T09:40:47.903Z',
				},
			],
		},
		{
			id: '980bfcb3-0e4a-4946-b132-c7f0e60756f6',
			name: '12313',
			description: '13123',
			url: '',
			imageSrc: '',
			createdBy: {
				id: 'dd429b2f-1877-4991-9a42-acdc76418476',
				username: 'Nikitos_228',
			},
			createdAt: '2025-08-27T02:01:38.719Z',
			updatedAt: '2025-08-27T02:01:38.719Z',
			keywords: ['132'],
			type: {
				code: 'video',
				description: 'Видео',
			},
			specializations: [
				{
					id: 39,
					title: 'System Software Engineer',
					description:
						'Системный программист – специалист, который разрабатывает системное ПО (ОС, драйверы, компиляторы), обеспечивая взаимодействие железа и софта.',
					imageSrc: null,
					createdAt: '2025-02-06T18:41:59.722Z',
					updatedAt: '2025-02-06T18:41:59.722Z',
				},
			],
			skills: [
				{
					id: 54,
					title: 'Bash',
					description:
						'Bash — командный интерпретатор для Unix-подобных систем, позволяющий выполнять команды и писать скрипты.',
					imageSrc: null,
					createdAt: '2025-02-08T09:33:23.206Z',
					updatedAt: '2025-02-08T09:40:47.903Z',
				},
			],
		},
		{
			id: '1344cf47-7690-4387-af21-fc4a9df0563d',
			name: 'Svelte Kit Quickstart',
			description: 'Серия статей: создание full-stack приложения на Svelte Kit.',
			url: '',
			imageSrc: '',
			createdBy: {
				id: 'dd429b2f-1877-4991-9a42-acdc76418476',
				username: 'Nikitos_228',
			},
			createdAt: '2025-07-02T14:44:29.815Z',
			updatedAt: '2025-07-02T14:44:29.815Z',
			keywords: ['qqq'],
			type: {
				code: 'video',
				description: 'Видео',
			},
			specializations: [],
			skills: [],
		},
		{
			id: '8fa04d42-ae81-4cba-a76c-f314d0c1505d',
			name: 'JavaScript 30 Days',
			description: '30 практических мини-проектов, чтобы прокачать чистый JS.',
			url: '',
			imageSrc: '',
			createdBy: {
				id: 'dd429b2f-1877-4991-9a42-acdc76418476',
				username: 'Nikitos_228',
			},
			createdAt: '2025-07-02T14:46:58.620Z',
			updatedAt: '2025-07-02T14:46:58.620Z',
			keywords: ['qqq'],
			type: {
				code: 'video',
				description: 'Видео',
			},
			specializations: [],
			skills: [],
		},
		{
			id: '883cab0b-1483-4792-90cf-bfab2fe327f4',
			name: 'Docker for Node.js',
			description: 'Курс: контейнеризация Node-приложений с лучшими практиками.',
			url: '',
			imageSrc: '',
			createdBy: {
				id: 'dd429b2f-1877-4991-9a42-acdc76418476',
				username: 'Nikitos_228',
			},
			createdAt: '2025-07-02T17:15:44.754Z',
			updatedAt: '2025-07-02T17:15:44.754Z',
			keywords: ['qqq'],
			type: {
				code: 'video',
				description: 'Видео',
			},
			specializations: [],
			skills: [],
		},
	],
	page: 1,
	limit: 10,
	total: 11,
};
