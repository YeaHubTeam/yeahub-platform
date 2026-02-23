import { Response } from '@/shared/libs';

import { ResourceRequest } from '@/entities/resource/model/types/resourceRequest';

export const myRequestsMock: Response<ResourceRequest[]> = {
	data: [
		{
			id: '1fc4d9e9-4ff0-41fb-8ece-a0686739fa36',
			userId: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			requestPayload: {
				url: 'моки стр1',
				name: 'капавиариаап',
				type: 'podcast',
				keywords: ['вававава'],
				description: 'авуапапапавццц',
			},
			status: 'pending',
			reviewedAt: null,
			reviewedBy: null,
			createdAt: '2026-01-20T14:39:38.831Z',
			specializations: [
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
					id: 25,
					title: 'Ruby Backend Developer',
					description:
						'Программисты Ruby (Ruby Developers) создают сервисную часть сайтов, корпоративные приложения, высоконагруженное программное обеспечение на языке общего назначения Ruby',
					imageSrc: null,
					createdAt: '2024-12-13T15:32:58.103Z',
					updatedAt: '2024-12-13T15:32:58.103Z',
				},
			],
			skills: [],
		},
		{
			id: '6c86e53b-46bb-4a2a-aec0-64605eb40679',
			userId: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			requestPayload: {
				url: 'павмиииииииаааааааа',
				name: 'таплаы',
				type: 'video',
				keywords: ['впав', 'авыамы', 'выапвыпыв'],
				description: 'пупупу',
			},
			status: 'pending',
			reviewedAt: null,
			reviewedBy: null,
			createdAt: '2026-01-20T12:04:20.336Z',
			specializations: [
				{
					id: 11,
					title: 'React Frontend Developer',
					description:
						'React-разработчик — это инженер-программист или веб-разработчик, который занимается фронтендом или дизайном пользовательских интерфейсов, используя библиотеку React',
					imageSrc: null,
					createdAt: '2024-10-03T09:08:10.605Z',
					updatedAt: '2024-12-13T15:29:16.935Z',
				},
			],
			skills: [],
		},
		{
			id: 'de7ca926-44a6-42c2-ae4f-bbd48b6b2a43',
			userId: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			requestPayload: {
				url: '123',
				name: '123123пппп',
				type: 'podcast',
				keywords: ['123'],
				description: '123123авауепhg',
			},
			status: 'pending',
			reviewedAt: null,
			reviewedBy: null,
			createdAt: '2025-11-21T08:40:49.923Z',
			specializations: [
				{
					id: 11,
					title: 'React Frontend Developer',
					description:
						'React-разработчик — это инженер-программист или веб-разработчик, который занимается фронтендом или дизайном пользовательских интерфейсов, используя библиотеку React',
					imageSrc: null,
					createdAt: '2024-10-03T09:08:10.605Z',
					updatedAt: '2024-12-13T15:29:16.935Z',
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
			],
		},
		{
			id: '1d8366ab-39e1-47f0-a3ac-4451bb1455f7',
			userId: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			requestPayload: {
				url: '213',
				name: '1231232132131',
				type: 'channel',
				keywords: ['123'],
				iconBase64: '',
				description: '123',
			},
			status: 'pending',
			reviewedAt: null,
			reviewedBy: null,
			createdAt: '2025-11-21T08:33:45.344Z',
			specializations: [
				{
					id: 11,
					title: 'React Frontend Developer',
					description:
						'React-разработчик — это инженер-программист или веб-разработчик, который занимается фронтендом или дизайном пользовательских интерфейсов, используя библиотеку React',
					imageSrc: null,
					createdAt: '2024-10-03T09:08:10.605Z',
					updatedAt: '2024-12-13T15:29:16.935Z',
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
			],
		},
		{
			id: '5fd29920-220f-4ffc-974f-eb9c5fe22451',
			userId: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			requestPayload: {
				url: '123213',
				name: '1111111112223333444',
				type: 'channel',
				keywords: ['123213'],
				iconBase64: '',
				description: '21321312312',
			},
			status: 'pending',
			reviewedAt: null,
			reviewedBy: null,
			createdAt: '2025-10-29T20:10:50.261Z',
			specializations: [
				{
					id: 23,
					title: 'Golang Backend Developer',
					description:
						'Бэкенд-разработчик на Golang специализируется на создании серверной части приложений, используя язык программирования Go, известный своей эффективностью и простотой синтаксиса.',
					imageSrc: null,
					createdAt: '2024-12-12T08:19:06.225Z',
					updatedAt: '2026-01-14T10:50:44.345Z',
				},
			],
			skills: [
				{
					id: 51,
					title: 'RabbitMQ',
					description:
						'Надежный брокер сообщений с поддержкой очередей, маршрутизации и подтверждений доставки.',
					imageSrc: null,
					createdAt: '2025-01-14T17:00:06.501Z',
					updatedAt: '2025-01-14T17:00:06.501Z',
				},
			],
		},
		{
			id: 'd1389e25-db2f-4212-b881-bc31d2d6687a',
			userId: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			requestPayload: {
				url: '1',
				name: '12',
				type: 'video',
				keywords: ['1'],
				description: '13',
			},
			status: 'approved',
			reviewedAt: '2025-10-20T16:45:48.894Z',
			reviewedBy: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			createdAt: '2025-10-20T16:44:23.983Z',
			specializations: [
				{
					id: 39,
					title: 'System Software Engineer',
					description:
						'Системный программист – специалист, который разрабатывает системное ПО (ОС, драйверы, компиляторы), обеспечивая взаимодействие железа и софта.',
					imageSrc: null,
					createdAt: '2025-02-06T18:41:59.722Z',
					updatedAt: '2025-10-23T09:37:10.249Z',
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
			id: 'bf0b3340-883e-48fa-8e8a-18f24d786ba4',
			userId: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			requestPayload: {
				url: '52',
				name: '55',
				type: 'course',
				imageSrc:
					'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/external_product_catalog/9bd4f976-f666-46fd-b963-4dbd16fef38b',
				keywords: ['53'],
				iconBase64: '',
				description: '54',
			},
			status: 'approved',
			reviewedAt: '2025-10-20T16:18:23.432Z',
			reviewedBy: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			createdAt: '2025-10-20T16:18:12.395Z',
			specializations: [
				{
					id: 39,
					title: 'System Software Engineer',
					description:
						'Системный программист – специалист, который разрабатывает системное ПО (ОС, драйверы, компиляторы), обеспечивая взаимодействие железа и софта.',
					imageSrc: null,
					createdAt: '2025-02-06T18:41:59.722Z',
					updatedAt: '2025-10-23T09:37:10.249Z',
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
			id: 'd0a075af-f291-4e2a-a0cb-0b24b18af8ed',
			userId: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			requestPayload: {
				url: '52',
				name: 'aboba',
				type: 'video',
				keywords: ['abobka'],
				iconBase64: '',
				description: 'aboba',
			},
			status: 'approved',
			reviewedAt: '2025-10-20T16:12:33.479Z',
			reviewedBy: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			createdAt: '2025-10-20T16:12:08.784Z',
			specializations: [
				{
					id: 29,
					title: 'QA Engineer',
					description:
						'QA-тестировщик или инженер по тестированию (QA-engineer) — это специалист, который создаёт сценарии тестирования, прогнозирует сбои и находит ошибки в продуктах.',
					imageSrc: null,
					createdAt: '2024-12-13T15:37:18.095Z',
					updatedAt: '2025-11-30T16:35:42.035Z',
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
			id: '97d9d126-b1c9-46b0-ae2d-4ff3cb52755b',
			userId: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			requestPayload: {
				url: '52',
				name: 'test201025',
				type: 'video',
				imageSrc:
					'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/external_product_catalog/281289af-cdd7-43c0-a57d-1dde7fe48d96',
				keywords: ['videotest'],
				iconBase64: '',
				description: 'test2010251908',
			},
			status: 'approved',
			reviewedAt: '2025-10-20T16:10:06.671Z',
			reviewedBy: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			createdAt: '2025-10-20T16:09:50.551Z',
			specializations: [
				{
					id: 39,
					title: 'System Software Engineer',
					description:
						'Системный программист – специалист, который разрабатывает системное ПО (ОС, драйверы, компиляторы), обеспечивая взаимодействие железа и софта.',
					imageSrc: null,
					createdAt: '2025-02-06T18:41:59.722Z',
					updatedAt: '2025-10-23T09:37:10.249Z',
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
			id: '34ef3764-0536-46ae-ba56-8cf240984786',
			userId: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			requestPayload: {
				url: 'aaaaaaaaaa',
				name: 'aaaaaaaaaaaaaaaaa',
				type: 'video',
				keywords: ['aaaaaa'],
				iconBase64: '',
				description: 'aaaaaaaaaaaaaaaaaaa',
			},
			status: 'approved',
			reviewedAt: '2025-10-20T16:03:04.530Z',
			reviewedBy: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			createdAt: '2025-10-20T16:02:40.056Z',
			specializations: [
				{
					id: 74,
					title: '123',
					description: '123',
					imageSrc: null,
					createdAt: '2025-10-01T19:52:16.629Z',
					updatedAt: '2025-10-01T19:52:16.629Z',
				},
			],
			skills: [],
		},
		{
			id: '237a4c83-45f2-4f0c-bd91-7e6c564bc1cb',
			userId: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			requestPayload: {
				url: 'моки стр2',
				name: 'sssssss',
				type: 'video',
				keywords: ['ssss'],
				iconBase64: '',
				description: 'sssssss',
			},
			status: 'approved',
			reviewedAt: '2025-10-20T15:55:57.207Z',
			reviewedBy: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			createdAt: '2025-10-20T15:55:02.054Z',
			specializations: [
				{
					id: 74,
					title: '123',
					description: '123',
					imageSrc: null,
					createdAt: '2025-10-01T19:52:16.629Z',
					updatedAt: '2025-10-01T19:52:16.629Z',
				},
			],
			skills: [],
		},
		{
			id: '414ff9c8-4779-41f8-b54c-568af4c82e46',
			userId: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			requestPayload: {
				url: '52',
				name: 'test2010',
				type: 'video',
				keywords: ['2010'],
				iconBase64: '',
				description: 'test2010',
			},
			status: 'approved',
			reviewedAt: '2025-10-20T15:51:15.836Z',
			reviewedBy: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			createdAt: '2025-10-20T15:45:39.313Z',
			specializations: [
				{
					id: 74,
					title: '123',
					description: '123',
					imageSrc: null,
					createdAt: '2025-10-01T19:52:16.629Z',
					updatedAt: '2025-10-01T19:52:16.629Z',
				},
			],
			skills: [],
		},
		{
			id: '774eec71-c261-4ab8-bf5b-20ad771d98b9',
			userId: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			requestPayload: {
				url: 'https://example.com/course',
				name: 'Ресурщище',
				type: 'course',
				imageSrc:
					'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/external_product_catalog/9436fc5e-20d8-48c1-a707-bbf6dac683ca',
				keywords: ['QA', 'Linux'],
				iconBase64: 'data:image/png;base64,...',
				description: 'Самый лучший ресурс из всех ресурсов',
			},
			status: 'rejected',
			reviewedAt: '2025-10-18T19:26:28.467Z',
			reviewedBy: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			createdAt: '2025-10-18T19:22:36.400Z',
			specializations: [
				{
					id: 29,
					title: 'QA Engineer',
					description:
						'QA-тестировщик или инженер по тестированию (QA-engineer) — это специалист, который создаёт сценарии тестирования, прогнозирует сбои и находит ошибки в продуктах.',
					imageSrc: null,
					createdAt: '2024-12-13T15:37:18.095Z',
					updatedAt: '2025-11-30T16:35:42.035Z',
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
			id: 'd22c2568-29ce-44a8-a443-c4b51c33f471',
			userId: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			requestPayload: {
				url: 'sad',
				name: ',b,b,b,,b,b',
				type: 'channel',
				keywords: ['sad'],
				iconBase64: '',
				description: 'asdasd',
			},
			status: 'rejected',
			reviewedAt: '2025-10-16T16:49:07.071Z',
			reviewedBy: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			createdAt: '2025-10-16T16:48:33.579Z',
			specializations: [
				{
					id: 11,
					title: 'React Frontend Developer',
					description:
						'React-разработчик — это инженер-программист или веб-разработчик, который занимается фронтендом или дизайном пользовательских интерфейсов, используя библиотеку React',
					imageSrc: null,
					createdAt: '2024-10-03T09:08:10.605Z',
					updatedAt: '2024-12-13T15:29:16.935Z',
				},
			],
			skills: [
				{
					id: 6,
					title: 'React',
					description:
						'React - библиотека JavaScript для создания пользовательских интерфейсов. Поддерживается Facebook и сообществом разработчиков и компаний.',
					imageSrc:
						'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/skill/dc42634d-468b-427d-9f7a-ea6d501911c5',
					createdAt: '2024-06-04T13:40:16.610Z',
					updatedAt: '2025-01-18T19:39:52.495Z',
				},
			],
		},
		{
			id: '5c66a5d0-0b38-4de8-ac05-30d47bb7105a',
			userId: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			requestPayload: {
				url: '2131',
				name: 'pdpfpfpfpfpfphgphp',
				type: 'course',
				keywords: ['asdas'],
				iconBase64: '',
				description: 'spdasldpasd',
			},
			status: 'rejected',
			reviewedAt: '2025-10-18T19:47:54.028Z',
			reviewedBy: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			createdAt: '2025-10-16T16:48:15.290Z',
			specializations: [
				{
					id: 40,
					title: 'Desktop Application Developer',
					description:
						'Разработчик настольных приложений – специалист, который создаёт кроссплатформенные или нативные программы для Windows, macOS и Linux.',
					imageSrc: null,
					createdAt: '2025-02-06T18:42:12.680Z',
					updatedAt: '2025-10-23T09:53:46.660Z',
				},
			],
			skills: [
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
			id: '28bf34f9-d202-4c9d-9fe3-c6ce0709e76c',
			userId: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			requestPayload: {
				url: '123',
				name: '11019191',
				type: 'video',
				keywords: ['213'],
				iconBase64: '',
				description: '1231',
			},
			status: 'rejected',
			reviewedAt: '2025-10-16T16:36:29.046Z',
			reviewedBy: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			createdAt: '2025-10-16T16:35:46.826Z',
			specializations: [
				{
					id: 39,
					title: 'System Software Engineer',
					description:
						'Системный программист – специалист, который разрабатывает системное ПО (ОС, драйверы, компиляторы), обеспечивая взаимодействие железа и софта.',
					imageSrc: null,
					createdAt: '2025-02-06T18:41:59.722Z',
					updatedAt: '2025-10-23T09:37:10.249Z',
				},
			],
			skills: [
				{
					id: 57,
					title: 'C++',
					description:
						'Расширение C с ООП, шаблонами, STL, для высокопроизводительных приложений и игр.',
					imageSrc: null,
					createdAt: '2025-02-10T20:12:08.413Z',
					updatedAt: '2025-02-10T20:12:08.413Z',
				},
			],
		},
		{
			id: 'd5895b52-a95d-4ef7-b8c9-30541a45de8b',
			userId: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			requestPayload: {
				url: '111',
				name: 'ppppppp',
				type: 'podcast',
				keywords: ['11'],
				iconBase64: '',
				description: 'pppp',
			},
			status: 'approved',
			reviewedAt: '2025-10-16T16:36:05.719Z',
			reviewedBy: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			createdAt: '2025-10-16T16:35:26.979Z',
			specializations: [
				{
					id: 40,
					title: 'Desktop Application Developer',
					description:
						'Разработчик настольных приложений – специалист, который создаёт кроссплатформенные или нативные программы для Windows, macOS и Linux.',
					imageSrc: null,
					createdAt: '2025-02-06T18:42:12.680Z',
					updatedAt: '2025-10-23T09:53:46.660Z',
				},
			],
			skills: [
				{
					id: 57,
					title: 'C++',
					description:
						'Расширение C с ООП, шаблонами, STL, для высокопроизводительных приложений и игр.',
					imageSrc: null,
					createdAt: '2025-02-10T20:12:08.413Z',
					updatedAt: '2025-02-10T20:12:08.413Z',
				},
			],
		},
		{
			id: 'e479113e-b718-4d97-9335-12e073e71d55',
			userId: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			requestPayload: {
				url: 'xc',
				name: 'cxcxcxcxcxcx',
				type: 'podcast',
				keywords: ['xc'],
				iconBase64: '',
				description: 'xcxc',
			},
			status: 'rejected',
			reviewedAt: '2025-10-16T16:34:05.135Z',
			reviewedBy: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			createdAt: '2025-10-16T16:33:50.241Z',
			specializations: [
				{
					id: 39,
					title: 'System Software Engineer',
					description:
						'Системный программист – специалист, который разрабатывает системное ПО (ОС, драйверы, компиляторы), обеспечивая взаимодействие железа и софта.',
					imageSrc: null,
					createdAt: '2025-02-06T18:41:59.722Z',
					updatedAt: '2025-10-23T09:37:10.249Z',
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
			id: '3b0730a3-48e8-4d4c-9ab1-f4987be8c9d5',
			userId: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			requestPayload: {
				url: 'https://yeatwork.ru/',
				name: 'прпрпр',
				type: 'course',
				keywords: ['юабвдыб'],
				iconBase64: '',
				description: 'лповлп',
			},
			status: 'approved',
			reviewedAt: '2025-10-16T16:31:58.613Z',
			reviewedBy: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			createdAt: '2025-10-16T16:19:27.960Z',
			specializations: [
				{
					id: 11,
					title: 'React Frontend Developer',
					description:
						'React-разработчик — это инженер-программист или веб-разработчик, который занимается фронтендом или дизайном пользовательских интерфейсов, используя библиотеку React',
					imageSrc: null,
					createdAt: '2024-10-03T09:08:10.605Z',
					updatedAt: '2024-12-13T15:29:16.935Z',
				},
			],
			skills: [
				{
					id: 57,
					title: 'C++',
					description:
						'Расширение C с ООП, шаблонами, STL, для высокопроизводительных приложений и игр.',
					imageSrc: null,
					createdAt: '2025-02-10T20:12:08.413Z',
					updatedAt: '2025-02-10T20:12:08.413Z',
				},
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
			id: 'fc940a3b-32bb-4aed-8ca0-c05f1891538b',
			userId: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			requestPayload: {
				url: 'https://yeatwork.ru/',
				name: 'проверка5',
				type: 'course',
				keywords: ['ддд'],
				iconBase64: '',
				description: 'зазпзп',
			},
			status: 'rejected',
			reviewedAt: '2025-10-18T19:49:57.105Z',
			reviewedBy: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			createdAt: '2025-10-16T15:34:39.577Z',
			specializations: [
				{
					id: 11,
					title: 'React Frontend Developer',
					description:
						'React-разработчик — это инженер-программист или веб-разработчик, который занимается фронтендом или дизайном пользовательских интерфейсов, используя библиотеку React',
					imageSrc: null,
					createdAt: '2024-10-03T09:08:10.605Z',
					updatedAt: '2024-12-13T15:29:16.935Z',
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
					id: 12,
					title: 'CI/CD',
					description:
						'CI/CD (Continuous Integration/Continuous Deployment) - методология автоматизации процессов разработки и развертывания программного обеспечения. Обеспечивает непрерывную поставку изменений в производственную среду.',
					imageSrc:
						'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/skill/44f67a37-e539-47d2-aba2-d7542dc0c124',
					createdAt: '2024-06-04T13:40:16.610Z',
					updatedAt: '2025-10-28T21:04:57.099Z',
				},
				{
					id: 3,
					title: 'Redux',
					description: 'Здравствуйте ',
					imageSrc:
						'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/skill/4ce88d39-82a8-4b75-9d5d-67dca5d935f7',
					createdAt: '2024-06-04T13:40:16.610Z',
					updatedAt: '2025-03-10T17:56:45.336Z',
				},
			],
		},
		{
			id: 'c2c263e3-37aa-46a4-b2e7-11fcfb6e3c92',
			userId: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			requestPayload: {
				url: 'https://yeatwork.ru/',
				name: 'проверка 4',
				type: 'article',
				keywords: ['пзппз'],
				iconBase64: '',
				description: 'прпрпрпр',
			},
			status: 'rejected',
			reviewedAt: '2025-10-16T15:37:34.148Z',
			reviewedBy: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			createdAt: '2025-10-16T15:33:52.662Z',
			specializations: [
				{
					id: 23,
					title: 'Golang Backend Developer',
					description:
						'Бэкенд-разработчик на Golang специализируется на создании серверной части приложений, используя язык программирования Go, известный своей эффективностью и простотой синтаксиса.',
					imageSrc: null,
					createdAt: '2024-12-12T08:19:06.225Z',
					updatedAt: '2026-01-14T10:50:44.345Z',
				},
			],
			skills: [
				{
					id: 12,
					title: 'CI/CD',
					description:
						'CI/CD (Continuous Integration/Continuous Deployment) - методология автоматизации процессов разработки и развертывания программного обеспечения. Обеспечивает непрерывную поставку изменений в производственную среду.',
					imageSrc:
						'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/skill/44f67a37-e539-47d2-aba2-d7542dc0c124',
					createdAt: '2024-06-04T13:40:16.610Z',
					updatedAt: '2025-10-28T21:04:57.099Z',
				},
				{
					id: 51,
					title: 'RabbitMQ',
					description:
						'Надежный брокер сообщений с поддержкой очередей, маршрутизации и подтверждений доставки.',
					imageSrc: null,
					createdAt: '2025-01-14T17:00:06.501Z',
					updatedAt: '2025-01-14T17:00:06.501Z',
				},
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
			id: 'f7da509b-af42-4771-9ad2-35a0262ab505',
			userId: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			requestPayload: {
				url: 'https://yeatwork.ru/',
				name: 'проверка3',
				type: 'course',
				keywords: ['ддд'],
				iconBase64: '',
				description: 'ролджд',
			},
			status: 'rejected',
			reviewedAt: '2025-10-16T15:32:09.895Z',
			reviewedBy: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			createdAt: '2025-10-16T08:26:53.091Z',
			specializations: [
				{
					id: 23,
					title: 'Golang Backend Developer',
					description:
						'Бэкенд-разработчик на Golang специализируется на создании серверной части приложений, используя язык программирования Go, известный своей эффективностью и простотой синтаксиса.',
					imageSrc: null,
					createdAt: '2024-12-12T08:19:06.225Z',
					updatedAt: '2026-01-14T10:50:44.345Z',
				},
			],
			skills: [
				{
					id: 51,
					title: 'RabbitMQ',
					description:
						'Надежный брокер сообщений с поддержкой очередей, маршрутизации и подтверждений доставки.',
					imageSrc: null,
					createdAt: '2025-01-14T17:00:06.501Z',
					updatedAt: '2025-01-14T17:00:06.501Z',
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
				{
					id: 53,
					title: 'Kubernetes',
					description:
						'Kubernetes — это система оркестрации контейнеров для автоматизации развертывания, управления и масштабирования приложений.',
					imageSrc: null,
					createdAt: '2025-02-07T22:40:47.965Z',
					updatedAt: '2025-02-07T22:40:47.965Z',
				},
			],
		},
		{
			id: 'c534ced2-e0bc-4423-b4cf-a034c1634296',
			userId: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			requestPayload: {
				url: 'https://yeatwork.ru/',
				name: 'проверка2',
				type: 'podcast',
				keywords: ['длд'],
				iconBase64: '',
				description: 'подддолме',
			},
			status: 'approved',
			reviewedAt: '2025-10-16T14:45:46.130Z',
			reviewedBy: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			createdAt: '2025-10-16T08:13:40.903Z',
			specializations: [
				{
					id: 39,
					title: 'System Software Engineer',
					description:
						'Системный программист – специалист, который разрабатывает системное ПО (ОС, драйверы, компиляторы), обеспечивая взаимодействие железа и софта.',
					imageSrc: null,
					createdAt: '2025-02-06T18:41:59.722Z',
					updatedAt: '2025-10-23T09:37:10.249Z',
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
				{
					id: 57,
					title: 'C++',
					description:
						'Расширение C с ООП, шаблонами, STL, для высокопроизводительных приложений и игр.',
					imageSrc: null,
					createdAt: '2025-02-10T20:12:08.413Z',
					updatedAt: '2025-02-10T20:12:08.413Z',
				},
			],
		},
		{
			id: '220fe64b-13eb-44ed-be2a-3992e26e3e37',
			userId: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			requestPayload: {
				url: 'asd',
				name: '33333',
				type: 'video',
				keywords: ['asd'],
				iconBase64: '',
				description: '333',
			},
			status: 'approved',
			reviewedAt: '2025-10-13T20:55:48.960Z',
			reviewedBy: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			createdAt: '2025-10-13T20:55:38.461Z',
			specializations: [
				{
					id: 39,
					title: 'System Software Engineer',
					description:
						'Системный программист – специалист, который разрабатывает системное ПО (ОС, драйверы, компиляторы), обеспечивая взаимодействие железа и софта.',
					imageSrc: null,
					createdAt: '2025-02-06T18:41:59.722Z',
					updatedAt: '2025-10-23T09:37:10.249Z',
				},
			],
			skills: [
				{
					id: 57,
					title: 'C++',
					description:
						'Расширение C с ООП, шаблонами, STL, для высокопроизводительных приложений и игр.',
					imageSrc: null,
					createdAt: '2025-02-10T20:12:08.413Z',
					updatedAt: '2025-02-10T20:12:08.413Z',
				},
			],
		},
		{
			id: '8826d5ad-eeaa-42a6-b00a-57007d5ed52c',
			userId: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			requestPayload: {
				url: 'asd',
				name: '2222222222222222',
				type: 'video',
				keywords: ['ad'],
				iconBase64: '',
				description: 'asd',
			},
			status: 'approved',
			reviewedAt: '2025-10-13T20:54:08.367Z',
			reviewedBy: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			createdAt: '2025-10-13T20:53:59.460Z',
			specializations: [
				{
					id: 39,
					title: 'System Software Engineer',
					description:
						'Системный программист – специалист, который разрабатывает системное ПО (ОС, драйверы, компиляторы), обеспечивая взаимодействие железа и софта.',
					imageSrc: null,
					createdAt: '2025-02-06T18:41:59.722Z',
					updatedAt: '2025-10-23T09:37:10.249Z',
				},
			],
			skills: [
				{
					id: 57,
					title: 'C++',
					description:
						'Расширение C с ООП, шаблонами, STL, для высокопроизводительных приложений и игр.',
					imageSrc: null,
					createdAt: '2025-02-10T20:12:08.413Z',
					updatedAt: '2025-02-10T20:12:08.413Z',
				},
			],
		},
		{
			id: '4bb79779-ffc9-4199-aa64-120e34e721d8',
			userId: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			requestPayload: {
				url: '123',
				name: 'fffffffffffffffff',
				type: 'podcast',
				keywords: ['213'],
				iconBase64: '',
				description: 'fff',
			},
			status: 'approved',
			reviewedAt: '2025-10-13T20:52:04.553Z',
			reviewedBy: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			createdAt: '2025-10-13T20:51:52.659Z',
			specializations: [
				{
					id: 23,
					title: 'Golang Backend Developer',
					description:
						'Бэкенд-разработчик на Golang специализируется на создании серверной части приложений, используя язык программирования Go, известный своей эффективностью и простотой синтаксиса.',
					imageSrc: null,
					createdAt: '2024-12-12T08:19:06.225Z',
					updatedAt: '2026-01-14T10:50:44.345Z',
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
			id: '597881c4-044b-4d5c-bd81-8c6dfcc8d318',
			userId: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			requestPayload: {
				url: '1312',
				name: '1231313213213213123',
				type: 'video',
				keywords: ['123'],
				iconBase64: '',
				description: '12321321',
			},
			status: 'approved',
			reviewedAt: '2025-10-13T20:50:07.358Z',
			reviewedBy: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			createdAt: '2025-10-13T20:49:43.768Z',
			specializations: [
				{
					id: 39,
					title: 'System Software Engineer',
					description:
						'Системный программист – специалист, который разрабатывает системное ПО (ОС, драйверы, компиляторы), обеспечивая взаимодействие железа и софта.',
					imageSrc: null,
					createdAt: '2025-02-06T18:41:59.722Z',
					updatedAt: '2025-10-23T09:37:10.249Z',
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
			id: 'f56537bd-967e-400c-8e25-192d4382d79d',
			userId: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			requestPayload: {
				url: '457q',
				name: '3446',
				type: 'podcast',
				keywords: ['5754'],
				iconBase64: '',
				description: '546q47',
			},
			status: 'rejected',
			reviewedAt: '2025-10-05T16:08:28.296Z',
			reviewedBy: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			createdAt: '2025-10-04T17:33:52.695Z',
			specializations: [
				{
					id: 39,
					title: 'System Software Engineer',
					description:
						'Системный программист – специалист, который разрабатывает системное ПО (ОС, драйверы, компиляторы), обеспечивая взаимодействие железа и софта.',
					imageSrc: null,
					createdAt: '2025-02-06T18:41:59.722Z',
					updatedAt: '2025-10-23T09:37:10.249Z',
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
			id: 'b20d3082-c32b-4cd1-80b4-cb321d744a34',
			userId: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			requestPayload: {
				url: 'оротлолюлджл',
				name: 'ролрл',
				type: 'article',
				keywords: ['бььдбджбжэ оролрдлоролж'],
				iconBase64: '',
				description: 'гншгшщджрлр ропорпод опоролдрлд',
			},
			status: 'rejected',
			reviewedAt: '2025-10-06T13:32:12.111Z',
			reviewedBy: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			createdAt: '2025-10-02T14:22:28.444Z',
			specializations: [
				{
					id: 40,
					title: 'Desktop Application Developer',
					description:
						'Разработчик настольных приложений – специалист, который создаёт кроссплатформенные или нативные программы для Windows, macOS и Linux.',
					imageSrc: null,
					createdAt: '2025-02-06T18:42:12.680Z',
					updatedAt: '2025-10-23T09:53:46.660Z',
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
			id: '043330bf-22e0-4a2e-8eb9-3b0006b650de',
			userId: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			requestPayload: {
				url: 'https://beeline.kz',
				name: 'Проверка23',
				type: 'course',
				keywords: ['JavaScript', 'TypeScript'],
				description: 'A data science course from Coursera',
			},
			status: 'rejected',
			reviewedAt: '2025-10-07T17:56:23.954Z',
			reviewedBy: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			createdAt: '2025-09-11T21:34:19.019Z',
			specializations: [
				{
					id: 40,
					title: 'Desktop Application Developer',
					description:
						'Разработчик настольных приложений – специалист, который создаёт кроссплатформенные или нативные программы для Windows, macOS и Linux.',
					imageSrc: null,
					createdAt: '2025-02-06T18:42:12.680Z',
					updatedAt: '2025-10-23T09:53:46.660Z',
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
	],
	total: 30,
	page: 1,
	limit: 10,
};
