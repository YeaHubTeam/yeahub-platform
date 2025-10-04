import { DEFAULT_SPECIALIZATION_NUMBER } from '@/shared/constants/queryConstants';
import { Response } from '@/shared/types/types';

import type { PopularSkillsResponse, Skill } from '@/entities/skill/model/types/skill';

export const skillsMock: Response<Skill[]> = {
	data: [
		{
			id: 3,
			title: 'SQL',
			description:
				'SQL (Structured Query Language) - язык запросов, используемый для управления и манипулирования базами данных. Позволяет пользователям эффективно хранить, извлекать и обрабатывать данные.',
			imageSrc: null,
			createdAt: '2024-06-04T13:40:16.610Z',
			updatedAt: '2024-11-02T13:49:41.909Z',
			specializations: [
				{
					id: 18,
					title: 'Backend',
					description: 'back',
					imageSrc: null,
					createdAt: '2024-11-02T06:54:26.066Z',
					updatedAt: '2024-11-02T06:54:37.972Z',
				},
				{
					id: 11,
					title: 'Frontend',
					description: 'Frontend-разработчик',
					imageSrc: null,
					createdAt: '2024-10-03T09:08:10.605Z',
					updatedAt: '2024-11-02T06:46:12.745Z',
				},
				{
					id: 79,
					title: 'Python Backend Developer',
					description:
						'это специалист, который занимается созданием и поддержкой серверной части веб-приложений и программного обеспечения на языке Python.',
					imageSrc: null,
					createdAt: '2024-12-28T17:11:02.504Z',
					updatedAt: '2024-12-28T17:11:02.504Z',
				},
			],
		},
		{
			id: 27,
			title: 'HTML',
			description:
				'Разметка веб-страниц с использованием семантических тегов для улучшения SEO и доступности.',
			imageSrc: null,
			createdAt: '2024-10-06T06:32:23.656Z',
			updatedAt: '2024-10-06T06:32:23.656Z',
			specializations: [
				{
					id: 11,
					title: 'Frontend',
					description: 'Frontend-разработчик',
					imageSrc: null,
					createdAt: '2024-10-03T09:08:10.605Z',
					updatedAt: '2024-11-02T06:46:12.745Z',
				},
			],
		},
		{
			id: 28,
			title: 'CSS',
			description:
				'Стилейзация интерфейсов, включая адаптивную верстку и оптимизацию для различных устройств с использованием Flexbox и Grid.',
			imageSrc: null,
			createdAt: '2024-10-06T06:32:44.139Z',
			updatedAt: '2024-10-06T06:32:44.139Z',
			specializations: [
				{
					id: 11,
					title: 'Frontend',
					description: 'Frontend-разработчик',
					imageSrc: null,
					createdAt: '2024-10-03T09:08:10.605Z',
					updatedAt: '2024-11-02T06:46:12.745Z',
				},
			],
		},
		{
			id: 157,
			title: '222',
			description: '1231',
			imageSrc: null,
			createdAt: '2024-12-26T21:52:35.506Z',
			updatedAt: '2024-12-26T21:52:35.506Z',
			specializations: [
				{
					id: 11,
					title: 'Frontend',
					description: 'Frontend-разработчик',
					imageSrc: null,
					createdAt: '2024-10-03T09:08:10.605Z',
					updatedAt: '2024-11-02T06:46:12.745Z',
				},
			],
		},
		{
			id: 158,
			title: '777',
			description: '777',
			imageSrc: null,
			createdAt: '2024-12-27T17:53:34.841Z',
			updatedAt: '2024-12-27T17:53:34.841Z',
			specializations: [
				{
					id: 16,
					title: 'Vue.js',
					description: '123124',
					imageSrc: null,
					createdAt: '2024-11-01T13:33:07.514Z',
					updatedAt: '2024-11-01T17:45:23.286Z',
				},
				{
					id: 11,
					title: 'Frontend',
					description: 'Frontend-разработчик',
					imageSrc: null,
					createdAt: '2024-10-03T09:08:10.605Z',
					updatedAt: '2024-11-02T06:46:12.745Z',
				},
			],
		},
		{
			id: 12,
			title: 'CI/CD',
			description:
				'CI/CD (Continuous Integration/Continuous Deployment) - методология автоматизации процессов разработки и развертывания программного обеспечения. Обеспечивает непрерывную поставку изменений в производственную среду.',
			imageSrc:
				'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/skill/13474377-8f0f-412f-9b30-6973f6b9bd33',
			createdAt: '2024-06-04T13:40:16.610Z',
			updatedAt: '2024-12-28T17:14:21.662Z',
			specializations: [
				{
					id: 11,
					title: 'Frontend',
					description: 'Frontend-разработчик',
					imageSrc: null,
					createdAt: '2024-10-03T09:08:10.605Z',
					updatedAt: '2024-11-02T06:46:12.745Z',
				},
				{
					id: 18,
					title: 'Backend',
					description: 'back',
					imageSrc: null,
					createdAt: '2024-11-02T06:54:26.066Z',
					updatedAt: '2024-11-02T06:54:37.972Z',
				},
			],
		},
		{
			id: 7,
			title: 'Git',
			description:
				'Git - система контроля версий, используемая для отслеживания изменений в исходном коде во время разработки программного обеспечения. Позволяет нескольким разработчикам эффективно сотрудничать над проектами.',
			imageSrc: null,
			createdAt: '2024-06-04T13:40:16.610Z',
			updatedAt: '2024-06-04T13:40:16.610Z',
			specializations: [
				{
					id: 79,
					title: 'Python Backend Developer',
					description:
						'это специалист, который занимается созданием и поддержкой серверной части веб-приложений и программного обеспечения на языке Python.',
					imageSrc: null,
					createdAt: '2024-12-28T17:11:02.504Z',
					updatedAt: '2024-12-28T17:11:02.504Z',
				},
				{
					id: 11,
					title: 'Frontend',
					description: 'Frontend-разработчик',
					imageSrc: null,
					createdAt: '2024-10-03T09:08:10.605Z',
					updatedAt: '2024-11-02T06:46:12.745Z',
				},
				{
					id: 17,
					title: 'AI',
					description: 'artificial intellegence',
					imageSrc: null,
					createdAt: '2024-11-02T06:51:02.236Z',
					updatedAt: '2024-11-02T06:51:37.459Z',
				},
				{
					id: 16,
					title: 'Vue.js',
					description: '123124',
					imageSrc: null,
					createdAt: '2024-11-01T13:33:07.514Z',
					updatedAt: '2024-11-01T17:45:23.286Z',
				},
				{
					id: 18,
					title: 'Backend',
					description: 'back',
					imageSrc: null,
					createdAt: '2024-11-02T06:54:26.066Z',
					updatedAt: '2024-11-02T06:54:37.972Z',
				},
				{
					id: 81,
					title: 'Golang Backend Developer',
					description: 'Golang Backend Developer',
					imageSrc: null,
					createdAt: '2025-01-06T16:30:36.632Z',
					updatedAt: '2025-01-06T16:30:36.632Z',
				},
				{
					id: 80,
					title: 'Java Backend Developer',
					description: 'Java Backend Developer',
					imageSrc: null,
					createdAt: '2025-01-06T16:30:15.698Z',
					updatedAt: '2025-01-06T16:30:15.698Z',
				},
			],
		},
		{
			id: 1,
			title: 'Test',
			description: 'Test Description',
			imageSrc: null,
			createdAt: '2024-06-04T13:40:16.610Z',
			updatedAt: '2024-11-01T21:12:43.803Z',
			specializations: [
				{
					id: 79,
					title: 'Python Backend Developer',
					description:
						'это специалист, который занимается созданием и поддержкой серверной части веб-приложений и программного обеспечения на языке Python.',
					imageSrc: null,
					createdAt: '2024-12-28T17:11:02.504Z',
					updatedAt: '2024-12-28T17:11:02.504Z',
				},
			],
		},
		{
			id: 16,
			title: 'Cybersecurity',
			description:
				'Кибербезопасность - практики и технологии для защиты компьютерных систем, сетей и данных от киберугроз.',
			imageSrc: null,
			createdAt: '2024-06-04T13:40:16.610Z',
			updatedAt: '2024-06-04T13:40:16.610Z',
			specializations: [
				{
					id: 79,
					title: 'Python Backend Developer',
					description:
						'это специалист, который занимается созданием и поддержкой серверной части веб-приложений и программного обеспечения на языке Python.',
					imageSrc: null,
					createdAt: '2024-12-28T17:11:02.504Z',
					updatedAt: '2024-12-28T17:11:02.504Z',
				},
			],
		},
		{
			id: 15,
			title: 'Kubernetes',
			description:
				'Kubernetes - платформа для автоматизации развертывания, масштабирования и управления контейнеризированными приложениями. Обеспечивает оркестрацию контейнеров и управление ресурсами.',
			imageSrc: null,
			createdAt: '2024-06-04T13:40:16.610Z',
			updatedAt: '2024-06-04T13:40:16.610Z',
			specializations: [
				{
					id: 79,
					title: 'Python Backend Developer',
					description:
						'это специалист, который занимается созданием и поддержкой серверной части веб-приложений и программного обеспечения на языке Python.',
					imageSrc: null,
					createdAt: '2024-12-28T17:11:02.504Z',
					updatedAt: '2024-12-28T17:11:02.504Z',
				},
			],
		},
		{
			id: 22,
			title: 'TypeScript',
			description:
				'TypeScript — это популярный статический типизатор (static type checker) или типизированное надмножество (typed superset) для JavaScript, инструмент, разработанный Microsoft и добавляющий систему типов к гибкости и динамическим возможностям JavaScript.',
			imageSrc:
				'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Typescript.svg/1200px-Typescript.svg.png',
			createdAt: '2024-09-22T17:32:57.134Z',
			updatedAt: '2024-09-22T17:32:57.134Z',
			specializations: [
				{
					id: 11,
					title: 'Frontend',
					description: 'Frontend-разработчик',
					imageSrc: null,
					createdAt: '2024-10-03T09:08:10.605Z',
					updatedAt: '2024-11-02T06:46:12.745Z',
				},
			],
		},
		{
			id: 2,
			title: 'JavaScript',
			description:
				'JavaScript - популярный язык программирования, в основном используемый для создания динамических и интерактивных веб-страниц. Он необходим для разработки интерфейсов веб-приложений.',
			imageSrc: null,
			createdAt: '2024-06-04T13:40:16.610Z',
			updatedAt: '2024-11-01T21:33:13.635Z',
			specializations: [
				{
					id: 11,
					title: 'Frontend',
					description: 'Frontend-разработчик',
					imageSrc: null,
					createdAt: '2024-10-03T09:08:10.605Z',
					updatedAt: '2024-11-02T06:46:12.745Z',
				},
				{
					id: 16,
					title: 'Vue.js',
					description: '123124',
					imageSrc: null,
					createdAt: '2024-11-01T13:33:07.514Z',
					updatedAt: '2024-11-01T17:45:23.286Z',
				},
			],
		},
		{
			id: 159,
			title: 'Django',
			description: 'Фреймворк',
			imageSrc: null,
			createdAt: '2025-01-01T15:13:33.989Z',
			updatedAt: '2025-01-01T15:13:33.989Z',
			specializations: [
				{
					id: 79,
					title: 'Python Backend Developer',
					description:
						'это специалист, который занимается созданием и поддержкой серверной части веб-приложений и программного обеспечения на языке Python.',
					imageSrc: null,
					createdAt: '2024-12-28T17:11:02.504Z',
					updatedAt: '2024-12-28T17:11:02.504Z',
				},
			],
		},
		{
			id: 6,
			title: 'React',
			description:
				'React - библиотека JavaScript для создания пользовательских интерфейсов. Поддерживается Facebook и сообществом разработчиков и компаний.',
			imageSrc: null,
			createdAt: '2024-06-04T13:40:16.610Z',
			updatedAt: '2024-06-04T13:40:16.610Z',
			specializations: [
				{
					id: 11,
					title: 'Frontend',
					description: 'Frontend-разработчик',
					imageSrc: null,
					createdAt: '2024-10-03T09:08:10.605Z',
					updatedAt: '2024-11-02T06:46:12.745Z',
				},
			],
		},
		{
			id: 8,
			title: 'Docker',
			description:
				'Docker - платформа для разработки, доставки и запуска приложений в контейнерах. Обеспечивает эффективный способ упаковки и развертывания программного обеспечения в различных средах.',
			imageSrc: null,
			createdAt: '2024-06-04T13:40:16.610Z',
			updatedAt: '2024-06-04T13:40:16.610Z',
			specializations: [
				{
					id: 16,
					title: 'Vue.js',
					description: '123124',
					imageSrc: null,
					createdAt: '2024-11-01T13:33:07.514Z',
					updatedAt: '2024-11-01T17:45:23.286Z',
				},
			],
		},
		{
			id: 160,
			title: 'Golang',
			description: 'Golang',
			imageSrc: null,
			createdAt: '2025-01-06T16:34:20.360Z',
			updatedAt: '2025-01-06T16:34:20.360Z',
			specializations: [
				{
					id: 81,
					title: 'Golang Backend Developer',
					description: 'Golang Backend Developer',
					imageSrc: null,
					createdAt: '2025-01-06T16:30:36.632Z',
					updatedAt: '2025-01-06T16:30:36.632Z',
				},
			],
		},
		{
			id: 161,
			title: 'Spring',
			description: 'Spring',
			imageSrc: null,
			createdAt: '2025-01-06T16:36:27.721Z',
			updatedAt: '2025-01-06T16:36:27.721Z',
			specializations: [
				{
					id: 80,
					title: 'Java Backend Developer',
					description: 'Java Backend Developer',
					imageSrc: null,
					createdAt: '2025-01-06T16:30:15.698Z',
					updatedAt: '2025-01-06T16:30:15.698Z',
				},
			],
		},
		{
			id: 162,
			title: 'Postgresql',
			description: 'Postgresql',
			imageSrc: null,
			createdAt: '2025-01-06T16:37:02.779Z',
			updatedAt: '2025-01-06T16:37:02.779Z',
			specializations: [
				{
					id: 79,
					title: 'Python Backend Developer',
					description:
						'это специалист, который занимается созданием и поддержкой серверной части веб-приложений и программного обеспечения на языке Python.',
					imageSrc: null,
					createdAt: '2024-12-28T17:11:02.504Z',
					updatedAt: '2024-12-28T17:11:02.504Z',
				},
				{
					id: 81,
					title: 'Golang Backend Developer',
					description: 'Golang Backend Developer',
					imageSrc: null,
					createdAt: '2025-01-06T16:30:36.632Z',
					updatedAt: '2025-01-06T16:30:36.632Z',
				},
				{
					id: 80,
					title: 'Java Backend Developer',
					description: 'Java Backend Developer',
					imageSrc: null,
					createdAt: '2025-01-06T16:30:15.698Z',
					updatedAt: '2025-01-06T16:30:15.698Z',
				},
			],
		},
	],
	page: 1,
	limit: 10,
	total: 18,
};

export const popularSkillsMock: PopularSkillsResponse = {
	page: 1,
	limit: 3,
	total: 2,
	specializationId: DEFAULT_SPECIALIZATION_NUMBER,
	data: [
		{
			id: 1,
			skill: {
				id: 13,
				title: 'ООП',
				description: 'Very nice',
				imageSrc: 'https://cdn.example.com/java.png',
				createdAt: '2024-04-21T13:58:30.398Z',
				updatedAt: '2024-04-21T14:56:02.499Z',
			},
			calculatedAt: '2024-12-12T19:16:34.726Z',
			frequencyStat: 82,
		},
		{
			id: 2,
			skill: {
				id: 14,
				title: 'Python',
				description: 'Frontend framework',
				imageSrc: 'https://cdn.example.com/react.png',
				createdAt: '2024-03-11T09:11:00.000Z',
				updatedAt: '2024-04-10T12:20:15.000Z',
			},
			calculatedAt: '2024-12-13T09:22:14.123Z',
			frequencyStat: 70,
		},
		{
			id: 1,
			skill: {
				id: 13,
				title: 'SQL',
				description: 'Very nice',
				imageSrc: 'https://cdn.example.com/java.png',
				createdAt: '2024-04-21T13:58:30.398Z',
				updatedAt: '2024-04-21T14:56:02.499Z',
			},
			calculatedAt: '2024-12-12T19:16:34.726Z',
			frequencyStat: 93,
		},
		{
			id: 1,
			skill: {
				id: 13,
				title: 'ООП',
				description: 'Very nice',
				imageSrc: 'https://cdn.example.com/java.png',
				createdAt: '2024-04-21T13:58:30.398Z',
				updatedAt: '2024-04-21T14:56:02.499Z',
			},
			calculatedAt: '2024-12-12T19:16:34.726Z',
			frequencyStat: 82,
		},
		{
			id: 2,
			skill: {
				id: 14,
				title: 'Python',
				description: 'Frontend framework',
				imageSrc: 'https://cdn.example.com/react.png',
				createdAt: '2024-03-11T09:11:00.000Z',
				updatedAt: '2024-04-10T12:20:15.000Z',
			},
			calculatedAt: '2024-12-13T09:22:14.123Z',
			frequencyStat: 70,
		},
		{
			id: 1,
			skill: {
				id: 13,
				title: 'SQL',
				description: 'Very nice',
				imageSrc: 'https://cdn.example.com/java.png',
				createdAt: '2024-04-21T13:58:30.398Z',
				updatedAt: '2024-04-21T14:56:02.499Z',
			},
			calculatedAt: '2024-12-12T19:16:34.726Z',
			frequencyStat: 93,
		},
	],
};
