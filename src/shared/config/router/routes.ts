export const ROUTES = {
	appRoute: '/',
	adminRoute: '/admin',
	admin: {
		questions: {
			route: 'questions',
			page: '/admin/questions',
			create: {
				route: 'create',
				page: '/admin/questions/create',
			},
			createMultiple: {
				route: 'create-multiple',
				page: '/admin/questions/create-multiple',
			},
			details: {
				route: ':questionId',
				page: '/admin/questions/:questionId',
			},
			edit: {
				route: ':questionId/edit',
				page: '/admin/questions/:questionId/edit',
			},
		},
		specializations: {
			route: 'specializations',
			page: '/admin/specializations',
			details: {
				route: ':specializationId',
				page: '/admin/specializations/:specializationId',
			},
			edit: {
				route: ':specializationId/edit',
				page: '/admin/specializations/:specializationId/edit',
			},
			create: {
				route: 'create',
				page: '/admin/specializations/create',
			},
		},
		skills: {
			route: 'skills',
			page: '/admin/skills',
			create: {
				route: 'create',
				page: '/admin/skills/create',
			},
			edit: {
				route: ':skillId/edit',
				page: '/admin/skills/:skillId/edit',
			},
			detail: {
				route: ':skillId',
				page: '/admin/skills/:skillId',
			},
		},
		users: {
			route: 'users',
			page: '/admin/users',
			edit: {
				route: ':userId/edit',
				page: '/admin/users/:userId/edit',
			},
			detail: {
				route: ':userId',
				page: '/admin/users/:userId',
			},
		},
		collections: {
			route: 'collections',
			page: '/admin/collections',
			create: {
				route: 'create',
				page: '/admin/collections/create',
			},
			details: {
				route: ':collectionId',
				page: '/admin/collections/:collectionId',
			},
			edit: {
				route: ':collectionId/edit',
				page: '/admin/collections/:collectionId/edit',
			},
		},
		resources: {
			route: 'resources',
			page: '/admin/resources',
			create: {
				route: 'create',
				page: '/admin/resources/create',
			},
			details: {
				route: ':resourceId',
				page: '/admin/resources/:resourceId',
			},
			edit: {
				route: ':resourceId/edit',
				page: '/admin/resources/:resourceId/edit',
			},
			requests: {
				route: 'requests',
				page: '/admin/resources/requests',
				view: {
					route: 'requests/:resourceId',
					page: '/admin/resources/requests/:resourceId',
				},
				edit: {
					route: 'requests/:resourceId/edit',
					page: '/admin/resources/requests/:resourceId/edit',
				},
			},
		},
		companies: {
			route: 'companies',
			page: '/admin/companies',
			create: {
				route: 'create',
				page: '/admin/companies/create',
			},
			edit: {
				route: ':companyId/edit',
				page: '/admin/companies/:companyId/edit',
			},
			details: {
				route: ':companyId',
				page: '/admin/companies/:companyId',
			},
		},
		topics: {
			route: 'topics',
			page: '/admin/topics',
			create: {
				route: 'create',
				page: '/admin/topics/create',
			},
			edit: {
				route: ':topicId/edit',
				page: '/admin/topics/:topicId/edit',
			},
			details: {
				route: ':topicId',
				page: '/admin/topics/:topicId',
			},
		},
		tasks: {
			route: 'tasks',
			page: '/admin/tasks',
			create: {
				route: 'create',
				page: '/admin/tasks/create',
			},
			edit: {
				route: ':taskId/edit',
				page: '/admin/tasks/:taskId/edit',
			},
			details: {
				route: ':taskId',
				page: '/admin/tasks/:taskId',
			},
		},
		referralLinks: {
			route: 'referralLinks',
			page: '/admin/referralLinks',
			create: {
				route: 'create',
				page: '/admin/referralLinks/create',
			},
			edit: {
				route: ':referralLinkId/edit',
				page: '/admin/referralLinks/:referralLinkId/edit',
			},
			details: {
				route: ':referralLinkId',
				page: '/admin/referralLinks/:referralLinkId',
			},
		},
	},
	auth: {
		route: 'auth',
		login: {
			route: 'login',
			page: '/auth/login',
		},
		register: {
			route: 'register',
			page: '/auth/register',
		},
		'forgot-password': {
			route: 'forgot-password',
			page: '/auth/forgot-password',
		},
		'password-recovery': {
			route: 'password-recovery',
			page: '/auth/password-recovery',
		},
	},
	profile: {
		route: 'profile',
		page: '/profile',
		edit: {
			route: 'edit',
			page: '/profile/edit',
		},
	},
	users: {
		route: 'users/:userId',
		page: '/users/:userId',
	},
	settings: {
		route: 'settings',
		page: '/settings',
	},
	analytics: {
		route: 'analytics',
		page: '/analytics',
		progressSpecializations: {
			route: 'progress-specializations',
			page: '/analytics/progress-specializations',
		},
		'popular-skills': {
			route: 'popular-skills',
			page: '/analytics/popular-skills',
		},
		'skills-proficiency': {
			route: 'skills',
			page: '/analytics/skills',
		},
		'difficult-questions': {
			route: 'difficultQuestions',
			page: '/analytics/difficultQuestions',
		},
		'popular-questions': {
			route: 'popular-questions',
			page: '/analytics/popular-questions',
		},
		'users-rating': {
			route: 'users-rating',
			page: '/analytics/users-rating',
		},
	},
	interview: {
		route: 'interview',
		page: '/interview',
		history: {
			route: 'history',
			page: '/interview/history',
			result: {
				route: ':quizId',
				page: '/interview/history/:quizId',
			},
		},
		statistic: {
			route: 'statistic',
			page: '/interview/statistic',
		},
		quiz: {
			route: 'quiz',
			page: '/interview/quiz',
		},
		new: {
			route: 'new',
			page: '/interview/new',
		},
	},

	tasks: {
		route: 'tasks',
		page: '/tasks',
		detail: {
			route: ':taskId',
			page: '/tasks/:taskId',
		},
	},
	wiki: {
		route: 'wiki',
		page: '/wiki',
		questions: {
			route: 'questions',
			page: '/wiki/questions',
			detail: {
				route: ':questionId',
				page: '/wiki/questions/:questionId',
			},
		},
		collections: {
			route: 'collections',
			page: '/wiki/collections',
			detail: {
				route: ':collectionId',
				page: '/wiki/collections/:collectionId',
			},
		},
		resources: {
			route: 'resources',
			page: '/wiki/resources',
			my: {
				route: 'my-requests',
				page: '/wiki/resources/my-requests',
				create: {
					route: 'create',
					page: '/wiki/resources/my-requests/create',
				},
				edit: {
					route: ':requestId/edit',
					page: '/wiki/resources/my-requests/:requestId/edit',
				},
				request: {
					route: ':requestId',
					page: '/wiki/resources/my-requests/:requestId',
				},
			},
		},
	},
	public: {
		docs: {
			page: `${process.env.LANDING_URL}/docs`,
		},
		media: {
			page: `${process.env.LANDING_URL}/media`,
		},
		questions: {
			page: `${process.env.LANDING_URL}/questions`,
			detail: {
				page: `${process.env.LANDING_URL}/questions/:questionId`,
			},
		},
		quiz: {
			page: `${process.env.LANDING_URL}/quiz`,
			new: {
				page: `${process.env.LANDING_URL}/quiz/new`,
			},
			result: {
				page: `${process.env.LANDING_URL}/quiz/result`,
			},
		},
		collections: {
			page: `${process.env.LANDING_URL}/collections`,
			detail: {
				page: `${process.env.LANDING_URL}/collections/:collectionId`,
			},
		},
		resources: {
			page: `${process.env.LANDING_URL}/resources`,
		},
		learning: {
			page: `${process.env.LANDING_URL}/learning`,
		},
		avos: {
			page: `${process.env.LANDING_URL}/avos`,
		},
		hhAnalytics: {
			page: `${process.env.LANDING_URL}/hh-analytics`,
		},
	},
} as const;
