import { AuthResponse, FullProfile } from '../../../model/types/auth';

export const adminCredentials = {
	username: 'admin@yeahub.ru',
	password: 'Password123!',
} as const;

const adminPermissions = [
	{ id: 1, name: 'View members list/profile' },
	{ id: 2, name: 'View candidates list/profile' },
	{ id: 3, name: 'Edit own profile' },
	{ id: 4, name: 'Edit user profiles' },
	{ id: 5, name: 'Add (edit own) vacancy' },
	{ id: 6, name: 'View vacancies' },
	{ id: 7, name: 'Edit user roles' },
	{ id: 8, name: 'Edit user rate' },
	{ id: 9, name: 'Add articles/blog' },
	{ id: 10, name: 'Edit own articles/blog' },
	{ id: 11, name: 'Edit user articles/blog' },
	{ id: 12, name: 'Edit system dictionaries' },
];

const adminRoles = [
	{
		id: 4,
		name: 'admin',
		permissions: adminPermissions,
	},
	{
		id: 6,
		name: 'candidate-free',
		permissions: [],
	},
];

const reactFrontendSpecialization = {
	id: 11,
	title: 'React Frontend Developer',
	slug: 'react-frontend-developer',
	description:
		'React-разработчик — это инженер-программист или веб-разработчик, который занимается фронтендом или дизайном пользовательских интерфейсов, используя библиотеку React',
	imageSrc: null,
	createdAt: '2024-10-03T09:08:10.605Z',
	updatedAt: '2026-02-13T20:30:49.216Z',
};

const qaSpecialization = {
	id: 29,
	title: 'QA Engineer',
	slug: 'qa-engineer',
	description:
		'QA-тестировщик или инженер по тестированию (QA-engineer) — это специалист, который создаёт сценарии тестирования, прогнозирует сбои и находит ошибки в продуктах.',
	imageSrc: null,
	createdAt: '2024-12-13T15:37:18.095Z',
	updatedAt: '2025-11-30T16:35:42.035Z',
};

const pythonSpecialization = {
	id: 19,
	title: 'Python Developer',
	slug: 'python-developer',
	description:
		'это специалист, который занимается созданием и поддержкой серверной части веб-приложений и программного обеспечения на языке Python.',
	imageSrc: null,
	createdAt: '2024-12-07T18:52:21.327Z',
	updatedAt: '2025-03-03T06:28:57.435Z',
};

const javaSpecialization = {
	id: 20,
	title: 'Java Backend Developer',
	slug: 'java-backend-developer',
	description:
		'Это специалист, который разрабатывает серверные приложения на языке Java с использованием фреймворков, таких как Spring Framework',
	imageSrc: null,
	createdAt: '2024-12-07T18:53:51.891Z',
	updatedAt: '2025-03-08T16:11:55.762Z',
};

const nodeSpecialization = {
	id: 21,
	title: 'Node.js Backend Developer',
	slug: 'nodejs-backend-developer',
	description:
		'Это специалист, который разрабатывает серверные приложения и сервисы с использованием платформы Node.js.',
	imageSrc: null,
	createdAt: '2024-12-07T19:06:16.704Z',
	updatedAt: '2025-03-08T16:37:48.063Z',
};

const golangSpecialization = {
	id: 23,
	title: 'Golang Backend Developer',
	slug: 'golang-backend-developer',
	description:
		'Бэкенд-разработчик на Golang специализируется на создании серверной части приложений, используя язык программирования Go, известный своей эффективностью и простотой синтаксиса.',
	imageSrc: null,
	createdAt: '2024-12-12T08:19:06.225Z',
	updatedAt: '2026-01-14T10:50:44.345Z',
};

const rubySpecialization = {
	id: 25,
	title: 'Ruby Backend Developer',
	slug: 'ruby-backend-developer',
	description:
		'Программисты Ruby (Ruby Developers) создают сервисную часть сайтов, корпоративные приложения, высоконагруженное программное обеспечение на языке общего назначения Ruby',
	imageSrc: null,
	createdAt: '2024-12-13T15:32:58.103Z',
	updatedAt: '2026-05-21T17:22:46.234Z',
};

const phpSpecialization = {
	id: 24,
	title: 'PHP Backend Developer',
	slug: 'php-backend-developer',
	description:
		'PHP-разработчик – это специалист, который пишет код на языке программирования, предназначенном для разработки сайтов и веб-приложений.',
	imageSrc: null,
	createdAt: '2024-12-13T15:31:35.357Z',
	updatedAt: '2026-02-15T18:53:06.620Z',
};

const cPlusPlusSpecialization = {
	id: 32,
	title: 'C/C++ Backend Developer',
	slug: 'ccplusplus-backend-developer',
	description:
		'C/C++ бэкэнд разработчик – специалист, который разрабатывает высокопроизводительные серверные приложения, системы реального времени и низкоуровневое ПО.',
	imageSrc: null,
	createdAt: '2025-02-06T18:40:26.115Z',
	updatedAt: '2025-02-06T18:40:26.115Z',
};

const cSharpSpecialization = {
	id: 33,
	title: 'C# Backend Developer',
	slug: 'c-backend-developer',
	description:
		'C# бэкэнд разработчик – специалист, который создаёт серверные приложения на .NET, включая веб-API, бизнес-логику и работу с базами данных.',
	imageSrc: null,
	createdAt: '2025-02-06T18:40:41.619Z',
	updatedAt: '2025-02-06T18:40:41.619Z',
};

const rustSpecialization = {
	id: 28,
	title: 'Rust Backend Developer',
	slug: 'rust-backend-developer',
	description:
		'Rust-разработчик — это специалист, который занимается разработкой софта с использованием языка Rust. Его часто всего применяют в backend-разработке',
	imageSrc: null,
	createdAt: '2024-12-13T15:35:50.181Z',
	updatedAt: '2024-12-13T15:35:50.181Z',
};

const devOpsSpecialization = {
	id: 36,
	title: 'DevOps Engineer',
	slug: 'devops-engineer',
	description:
		'DevOps инженер – специалист, который автоматизирует развертывание, мониторинг и управление инфраструктурой, обеспечивая стабильность и масштабируемость сервисов.',
	imageSrc: null,
	createdAt: '2025-02-06T18:41:25.249Z',
	updatedAt: '2025-02-06T18:41:25.249Z',
};

const machineLearningSpecialization = {
	id: 37,
	title: 'Machine Learning Engineer',
	slug: 'machine-learning-engineer',
	description:
		'ML-инженер – разработчик, который создаёт и оптимизирует модели машинного обучения для интеллектуального анализа данных и автоматизации процессов.',
	imageSrc: null,
	createdAt: '2025-02-06T18:41:37.029Z',
	updatedAt: '2025-02-06T18:41:37.029Z',
};

const reactRouterSkill = {
	id: 15,
	title: 'React Router',
	description:
		'React Router — это библиотека для навигации между разными частями веб-приложения, созданного на React.',
	imageSrc:
		'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/skill/7f2921be-d268-4153-965e-70f93317d061',
	createdAt: '2024-06-04T13:40:16.610Z',
	updatedAt: '2025-01-18T19:57:40.588Z',
	specializations: [reactFrontendSpecialization],
};

const ciCdSkill = {
	id: 12,
	title: 'CI/CD',
	description:
		'CI/CD (Continuous Integration/Continuous Deployment) - методология автоматизации процессов разработки и развертывания программного обеспечения. Обеспечивает непрерывную поставку изменений в производственную среду.',
	imageSrc:
		'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/skill/44f67a37-e539-47d2-aba2-d7542dc0c124',
	createdAt: '2024-06-04T13:40:16.610Z',
	updatedAt: '2025-10-28T21:04:57.099Z',
	specializations: [
		reactFrontendSpecialization,
		qaSpecialization,
		pythonSpecialization,
		javaSpecialization,
		nodeSpecialization,
		golangSpecialization,
		rubySpecialization,
		phpSpecialization,
		cPlusPlusSpecialization,
		cSharpSpecialization,
		rustSpecialization,
		devOpsSpecialization,
		machineLearningSpecialization,
	],
};

const reactSkill = {
	id: 6,
	title: 'React',
	description:
		'React - библиотека JavaScript для создания пользовательских интерфейсов. Поддерживается Facebook и сообществом разработчиков и компаний.',
	imageSrc:
		'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/skill/dc42634d-468b-427d-9f7a-ea6d501911c5',
	createdAt: '2024-06-04T13:40:16.610Z',
	updatedAt: '2025-01-18T19:39:52.495Z',
	specializations: [reactFrontendSpecialization],
};

const typeScriptSkill = {
	id: 22,
	title: 'TypeScript',
	description:
		'TypeScript — это популярный статический типизатор (static type checker) или типизированное надмножество (typed superset) для JavaScript, инструмент, разработанный Microsoft и добавляющий систему типов к гибкости и динамическим возможностям JavaScript.',
	imageSrc:
		'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Typescript.svg/1200px-Typescript.svg.png',
	createdAt: '2024-09-22T17:32:57.134Z',
	updatedAt: '2024-09-22T17:32:57.134Z',
	specializations: [reactFrontendSpecialization, nodeSpecialization],
};

const springSkill = {
	id: 39,
	title: 'Spring',
	description:
		'Мощный фреймворк для разработки приложений на Java с акцентом на инверсию управления и конфигурацию.',
	imageSrc: null,
	createdAt: '2024-12-14T23:14:06.710Z',
	updatedAt: '2024-12-14T23:14:06.710Z',
	specializations: [javaSpecialization],
};

export const adminAuthMockResponse = {
	access_token:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQHllYWh1Yi5ydSIsInN1YiI6IjdkMGY4ZjU4LTk4N2UtNDgyYS05MTNkLWUxYzQyOWQyZDg0MiIsImlhdCI6MTc3OTcyMTg0MywiZXhwIjoxNzc5ODA4MjQzfQ.CowNQbU1n09seuWupS9A7FnIHmqZ3iHiqumQgmvkXzc',
	user: {
		id: '7d0f8f58-987e-482a-913d-e1c429d2d842',
		username: 'adminadminov4995',
		telegramUsername: null,
		phone: null,
		country: null,
		city: 'spppb',
		email: adminCredentials.username,
		birthday: null,
		address: '',
		avatarUrl:
			'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/users_avatars/dae97d47-514a-46b1-b8ea-11c75327ebe9',
		createdAt: '2025-02-20T08:04:24.006Z',
		updatedAt: '2026-05-25T14:51:14.282Z',
		isVerified: true,
		isEmailNotificationsEnable: true,
		userRoles: adminRoles,
	},
} as unknown as AuthResponse;

export const adminProfileMockResponse = {
	id: '7d0f8f58-987e-482a-913d-e1c429d2d842',
	username: 'adminadminov4995',
	telegramUsername: null,
	phone: null,
	country: null,
	city: 'spppb',
	email: adminCredentials.username,
	birthday: null,
	address: '',
	avatarUrl:
		'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/users_avatars/dae97d47-514a-46b1-b8ea-11c75327ebe9',
	createdAt: '2025-02-20T08:04:24.006Z',
	updatedAt: '2026-05-25T15:10:43.173Z',
	isVerified: true,
	isEmailNotificationsEnable: true,
	userRoles: adminRoles,
	profiles: [
		{
			id: 'a1525025-4f6b-426e-9917-0d0ac956de9d',
			profileType: 1,
			specializationId: 19,
			markingWeight: 1,
			description: '<p>123</p>',
			socialNetwork: [
				{ code: 'linkedin', title: '1231' },
				{ code: 'twitter', title: '1312' },
				{ code: 'facebook', title: '123' },
				{ code: 'github', title: '12311' },
				{ code: 'behance', title: '123' },
				{ code: 'whatsapp', title: '1232' },
				{ code: 'telegram', title: '1231' },
				{ code: 'youtube', title: '132' },
			],
			image_src: null,
			isActive: false,
			profileSkills: [reactRouterSkill, ciCdSkill],
			ratingPoints: 0,
		},
		{
			id: 'ffe99430-4ac2-40df-9e6b-4f5f8909748c',
			profileType: 1,
			specializationId: 11,
			markingWeight: 1,
			description: '',
			socialNetwork: [
				{ code: 'instagram', title: 'rfeegd' },
				{ code: 'linkedin', title: 'dgdfg' },
				{ code: 'twitter', title: 'dgdfgdf' },
				{ code: 'facebook', title: 'dfgdfg' },
				{ code: 'github', title: 'gdgd' },
				{ code: 'behance', title: 'dggdfg' },
				{ code: 'whatsapp', title: 'dfgd' },
				{ code: 'telegram', title: 'dfgdgf' },
				{ code: 'youtube', title: 'gdg' },
			],
			image_src: null,
			isActive: true,
			profileSkills: [reactRouterSkill, typeScriptSkill, springSkill],
			ratingPoints: 0,
		},
		{
			id: 'c9d83c35-4ee4-4470-ba6b-ac7b22a5cc5f',
			profileType: 1,
			specializationId: 101,
			markingWeight: 1,
			description: '',
			socialNetwork: [],
			image_src: null,
			isActive: false,
			profileSkills: [reactSkill, typeScriptSkill, springSkill],
			ratingPoints: 0,
		},
	],
	subscriptions: [
		{
			id: '54c80f42-0f99-46ba-975e-755462b80c11',
			createDate: '2026-05-24T10:19:22.503Z',
			endDate: '2025-10-04T14:51:11.315Z',
			subscriptionId: 3,
			userId: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			state: 'pending_payment',
			paymentAttemptsCount: 0,
			paymentError:
				'RebillId for user with id = 7d0f8f58-987e-482a-913d-e1c429d2d842 not found, subscription will be paused',
			fixedPrice: 400,
			subscription: {
				id: 3,
				name: 'Участник сообщества',
				code: 'month',
				isActive: true,
				pricePerMonth: 800,
				discount: 50,
				monthPeriod: 1,
				description: null,
				promo: null,
				parentId: null,
				roles: [{ id: 7, name: 'candidate-premium', permissions: [] }],
			},
		},
		{
			id: '374fcafb-6595-4282-80fb-1360fff2160c',
			createDate: '2026-05-24T10:11:20.780Z',
			endDate: null,
			subscriptionId: 6,
			userId: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			state: 'pending_payment',
			paymentAttemptsCount: 0,
			paymentError: null,
			fixedPrice: 1080,
			subscription: {
				id: 6,
				name: 'Премиум на 3 месяца',
				code: 'quarter',
				isActive: true,
				pricePerMonth: 400,
				discount: 10,
				monthPeriod: 3,
				description: null,
				promo: null,
				parentId: 3,
				roles: [{ id: 7, name: 'candidate-premium', permissions: [] }],
			},
		},
		{
			id: '46539294-3124-4efe-be2a-790f2e9879ed',
			createDate: '2025-11-14T14:45:22.630Z',
			endDate: null,
			subscriptionId: 2,
			userId: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			state: 'pending_payment',
			paymentAttemptsCount: 0,
			paymentError: null,
			fixedPrice: null,
			subscription: {
				id: 2,
				name: 'Базовая',
				code: 'base',
				isActive: false,
				pricePerMonth: 200,
				discount: 0,
				monthPeriod: 1,
				description: null,
				promo: null,
				parentId: null,
				roles: [
					{
						id: 2,
						name: 'candidate',
						permissions: [
							{ id: 3, name: 'Edit own profile' },
							{ id: 1, name: 'View members list/profile' },
							{ id: 2, name: 'View candidates list/profile' },
							{ id: 6, name: 'View vacancies' },
						],
					},
				],
			},
		},
		{
			id: 'ea66033d-bb95-4902-9b46-8324bea6c702',
			createDate: '2025-07-07T09:31:06.072Z',
			endDate: '2025-08-07T18:20:09.228Z',
			subscriptionId: 1,
			userId: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			state: 'active',
			paymentAttemptsCount: 0,
			paymentError: null,
			fixedPrice: 400,
			subscription: {
				id: 1,
				name: 'Кандидат',
				code: 'free',
				isActive: true,
				pricePerMonth: 0,
				discount: 0,
				monthPeriod: 1,
				description: null,
				promo: null,
				parentId: null,
				roles: [{ id: 6, name: 'candidate-free', permissions: [] }],
			},
		},
		{
			id: '3fcc20e9-70ab-4628-b646-1170abd57cfa',
			createDate: '2025-06-20T20:56:41.458Z',
			endDate: '2025-08-04T00:00:00.000Z',
			subscriptionId: 4,
			userId: '7d0f8f58-987e-482a-913d-e1c429d2d842',
			state: 'inactive',
			paymentAttemptsCount: 0,
			paymentError: null,
			fixedPrice: null,
			subscription: {
				id: 4,
				name: 'Пробная',
				code: 'trial',
				isActive: true,
				pricePerMonth: 0,
				discount: 0,
				monthPeriod: 1,
				description: null,
				promo: null,
				parentId: null,
				roles: [{ id: 7, name: 'candidate-premium', permissions: [] }],
			},
		},
	],
} as unknown as FullProfile;
