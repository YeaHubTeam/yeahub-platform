import { AuthResponse, FullProfile } from '../../../model/types/auth';

export const userFreeCredentials = {
	username: 'user-free@yeahub.ru',
	password: 'Password123!',
} as const;

const userFreeCity =
	'123456789012345678990123111123845678901234567890123111123456789012345678901231111234567890123456789012311112345678901234567890123111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111';

export const userFreeAuthMockResponse = {
	access_token:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXItZnJlZUB5ZWFodWIucnUiLCJzdWIiOiIzZWU4NWIzZC0wYzA5LTRhNTUtYmRmMS1mNmE1NWFiMWMzZWUiLCJpYXQiOjE3Nzk3MjE1MDEsImV4cCI6MTc3OTgwNzkwMX0.0Xm-GIfzhd5fBwPIi2b47S1p7-ObT1JxF7W9nE4PBco',
	user: {
		id: '3ee85b3d-0c09-4a55-bdf1-f6a55ab1c3ee',
		username: 'yuzerbesplatnyj',
		telegramUsername: null,
		phone: null,
		country: null,
		city: userFreeCity,
		email: userFreeCredentials.username,
		birthday: null,
		address: '',
		avatarUrl:
			'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/users_avatars/559d3df3-f179-4d43-8260-655fbf298ec2',
		createdAt: '2025-02-20T08:03:36.468Z',
		updatedAt: '2026-05-24T15:59:52.095Z',
		isVerified: true,
		isEmailNotificationsEnable: true,
		userRoles: [
			{
				id: 6,
				name: 'candidate-free',
				permissions: [],
			},
		],
	},
} as unknown as AuthResponse;

export const userFreeProfileMockResponse = {
	id: '3ee85b3d-0c09-4a55-bdf1-f6a55ab1c3ee',
	username: 'yuzerbesplatnyj',
	telegramUsername: null,
	phone: null,
	country: null,
	city: userFreeCity,
	email: userFreeCredentials.username,
	birthday: null,
	address: '',
	avatarUrl:
		'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/users_avatars/559d3df3-f179-4d43-8260-655fbf298ec2',
	createdAt: '2025-02-20T08:03:36.468Z',
	updatedAt: '2026-05-25T15:05:01.838Z',
	isVerified: true,
	isEmailNotificationsEnable: true,
	userRoles: [
		{
			id: 6,
			name: 'candidate-free',
			permissions: [],
		},
	],
	profiles: [
		{
			id: 'bd902e81-856a-4a49-8a21-8bc60e17fbc6',
			profileType: 1,
			specializationId: 40,
			markingWeight: 1,
			description: '<p>lj</p>',
			socialNetwork: [
				{
					code: 'instagram',
					title: 'ilay121112211118999',
				},
				{
					code: 'linkedin',
					title: 'ilay4327wd3',
				},
				{
					code: 'twitter',
					title: 'ilay132',
				},
				{
					code: 'facebook',
					title:
						'1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111131111111111111111111111111111111111111111111',
				},
				{
					code: 'github',
					title: 'ilay1343',
				},
				{
					code: 'behance',
					title: 'Behance2',
				},
				{
					code: 'whatsapp',
					title: 'WhatsAppы',
				},
				{
					code: 'telegram',
					title: 'ilay321',
				},
				{
					code: 'youtube',
					title: 'ilay2211',
				},
			],
			image_src: null,
			isActive: false,
			profileSkills: [
				{
					id: 33,
					title: 'Python',
					description:
						'Python — это высокоуровневый язык программирования, отличающийся эффективностью, простотой и универсальностью использования.',
					imageSrc: null,
					createdAt: '2024-12-07T19:40:48.683Z',
					updatedAt: '2024-12-07T19:40:48.683Z',
					specializations: [
						{
							id: 19,
							title: 'Python Developer',
							slug: 'python-developer',
							description:
								'это специалист, который занимается созданием и поддержкой серверной части веб-приложений и программного обеспечения на языке Python.',
							imageSrc: null,
							createdAt: '2024-12-07T18:52:21.327Z',
							updatedAt: '2025-03-03T06:28:57.435Z',
						},
						{
							id: 29,
							title: 'QA Engineer',
							slug: 'qa-engineer',
							description:
								'QA-тестировщик или инженер по тестированию (QA-engineer) — это специалист, который создаёт сценарии тестирования, прогнозирует сбои и находит ошибки в продуктах.',
							imageSrc: null,
							createdAt: '2024-12-13T15:37:18.095Z',
							updatedAt: '2025-11-30T16:35:42.035Z',
						},
						{
							id: 34,
							title: 'Data Scientist',
							slug: 'data-scientist',
							description:
								'Дата-сайентист – специалист, который анализирует данные, строит модели машинного обучения и прогнозирует тренды для автоматизации решений.',
							imageSrc: null,
							createdAt: '2025-02-06T18:40:57.986Z',
							updatedAt: '2025-02-06T18:40:57.986Z',
						},
						{
							id: 36,
							title: 'DevOps Engineer',
							slug: 'devops-engineer',
							description:
								'DevOps инженер – специалист, который автоматизирует развертывание, мониторинг и управление инфраструктурой, обеспечивая стабильность и масштабируемость сервисов.',
							imageSrc: null,
							createdAt: '2025-02-06T18:41:25.249Z',
							updatedAt: '2025-02-06T18:41:25.249Z',
						},
						{
							id: 37,
							title: 'Machine Learning Engineer',
							slug: 'machine-learning-engineer',
							description:
								'ML-инженер – разработчик, который создаёт и оптимизирует модели машинного обучения для интеллектуального анализа данных и автоматизации процессов.',
							imageSrc: null,
							createdAt: '2025-02-06T18:41:37.029Z',
							updatedAt: '2025-02-06T18:41:37.029Z',
						},
					],
				},
			],
			ratingPoints: 0,
		},
		{
			id: 'eb27c2e0-b121-4ed8-b167-a24820efae09',
			profileType: 1,
			specializationId: 24,
			markingWeight: 1,
			description: '',
			socialNetwork: [],
			image_src: null,
			isActive: true,
			profileSkills: [],
			ratingPoints: 0,
		},
		{
			id: '0b6372b8-098c-4501-b991-0f43a983adea',
			profileType: 1,
			specializationId: 29,
			markingWeight: 1,
			description: '',
			socialNetwork: [],
			image_src: null,
			isActive: false,
			profileSkills: [],
			ratingPoints: 0,
		},
		{
			id: '0484ebbe-9380-48a8-b3d2-ec72703b7d4f',
			profileType: 1,
			specializationId: 11,
			markingWeight: 1,
			description: '',
			socialNetwork: [],
			image_src: null,
			isActive: false,
			profileSkills: [],
			ratingPoints: 0,
		},
		{
			id: '05aeffd8-a727-4ac4-8e18-c1f506ecd110',
			profileType: 1,
			specializationId: 39,
			markingWeight: 1,
			description: '',
			socialNetwork: [],
			image_src: null,
			isActive: false,
			profileSkills: [],
			ratingPoints: 0,
		},
		{
			id: 'a265ea24-4452-4724-b7f0-adfd1a2b3a3b',
			profileType: 1,
			specializationId: 3,
			markingWeight: 1,
			description: '',
			socialNetwork: [],
			image_src: null,
			isActive: false,
			profileSkills: [
				{
					id: 27,
					title: 'HTMl',
					description:
						'Разметка веб-страниц с использованием семантических тегов для улучшения SEO и доступности.',
					imageSrc:
						'https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/skill/6b8a29bc-ce64-4282-be53-d4e57ffdfad9',
					createdAt: '2024-10-06T06:32:23.656Z',
					updatedAt: '2025-04-18T08:18:05.193Z',
					specializations: [],
				},
			],
			ratingPoints: 0,
		},
	],
	subscriptions: [
		{
			id: '52fcc3d0-3a28-4c3c-bf1f-8c11f0768ec6',
			createDate: '2026-05-20T07:01:17.044Z',
			endDate: '2026-03-15T00:00:01.178Z',
			subscriptionId: 3,
			userId: '3ee85b3d-0c09-4a55-bdf1-f6a55ab1c3ee',
			state: 'pending_payment',
			paymentAttemptsCount: 0,
			paymentError:
				'RebillId for user with id = 3ee85b3d-0c09-4a55-bdf1-f6a55ab1c3ee not found, subscription will be paused',
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
				roles: [
					{
						id: 7,
						name: 'candidate-premium',
						permissions: [],
					},
				],
			},
		},
		{
			id: 'fff17b0a-e06c-4dbb-851f-4b767958791c',
			createDate: '2025-11-14T14:56:04.702Z',
			endDate: '2026-01-15T00:00:12.090Z',
			subscriptionId: 2,
			userId: '3ee85b3d-0c09-4a55-bdf1-f6a55ab1c3ee',
			state: 'inactive',
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
							{
								id: 6,
								name: 'View vacancies',
							},
							{
								id: 3,
								name: 'Edit own profile',
							},
							{
								id: 2,
								name: 'View candidates list/profile',
							},
							{
								id: 1,
								name: 'View members list/profile',
							},
						],
					},
				],
			},
		},
		{
			id: 'e3c39131-441d-4893-8df7-875a78100d26',
			createDate: '2025-11-02T23:07:18.214Z',
			endDate: '2025-11-09T23:07:18.210Z',
			subscriptionId: 4,
			userId: '3ee85b3d-0c09-4a55-bdf1-f6a55ab1c3ee',
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
				roles: [
					{
						id: 7,
						name: 'candidate-premium',
						permissions: [],
					},
				],
			},
		},
	],
} as unknown as FullProfile;
