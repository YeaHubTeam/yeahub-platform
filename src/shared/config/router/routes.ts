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
			details: {
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
	career: {
		route: 'career',
		page: '/career',
		vacancyMarket: {
			route: 'vacancy-market',
			page: '/career/vacancy-market',
			detail: {
				route: ':specializationId',
				page: '/career/vacancy-market/:specializationId',
			},
		},
		vacancies: {
			route: 'vacancies',
			page: '/career/vacancies',
		},
		'resume-analyzer': {
			route: 'resume-analyzer',
			page: '/career/resume-analyzer',
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
			result: {
				route: 'result',
				page: '/interview/new/result',
			},
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
			page: `${process.env.LANDING_URL}docs`,
		},
		avos: {
			page: `${process.env.LANDING_URL}avos`,
		},
		mentor: {
			page: `${process.env.LANDING_URL}mentor`,
		},
	},
} as const;
