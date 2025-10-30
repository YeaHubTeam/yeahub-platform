export const ROUTES = {
	appRoute: '/',
	platformRoute: '/dashboard',
	adminRoute: '/admin',
	admin: {
		questions: {
			route: 'questions',
			page: '/admin/questions',
			create: {
				route: 'create',
				page: '/admin/questions/create',
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
		page: '/dashboard/profile',
		edit: {
			route: 'edit',
			page: '/dashboard/profile/edit',
		},
	},
	users: {
		route: 'users/:userId',
		page: '/dashboard/users/:userId',
	},
	settings: {
		route: 'settings',
		page: '/dashboard/settings',
	},
	analytics: {
		route: 'analytics',
		page: '/dashboard/analytics',
		skills: {
			route: 'skills',
			page: '/dashboard/analytics/skills',
		},
		difficultQuestions: {
			route: 'difficultQuestions',
			page: '/dashboard/analytics/difficultQuestions',
		},
	},
	interview: {
		route: 'interview',
		page: '/dashboard/interview',
		history: {
			route: 'history',
			page: '/dashboard/interview/history',
			result: {
				route: ':quizId',
				page: '/dashboard/interview/history/:quizId',
			},
		},
		statistic: {
			route: 'statistic',
			page: '/dashboard/interview/statistic',
		},
		questions: {
			route: 'questions',
			page: '/dashboard/interview/questions',
			detail: {
				route: ':questionId',
				page: '/dashboard/interview/questions/:questionId',
			},
		},
		collections: {
			route: 'collections',
			page: '/dashboard/interview/collections',
			detail: {
				route: ':collectionId',
				page: '/dashboard/interview/collections/:collectionId',
			},
		},
		quiz: {
			route: 'quiz',
			page: '/dashboard/interview/quiz',
		},
		new: {
			route: 'new',
			page: '/dashboard/interview/new',
		},
	},
	wiki: {
		route: 'wiki',
		page: '/dashboard/wiki',
		resources: {
			route: 'resources',
			page: '/dashboard/wiki/resources',
			requests: {
				route: 'requests',
				page: '/dashboard/wiki/resources/requests',
			},
			my: {
				route: 'my-resources',
				page: '/dashboard/wiki/resources/my-resources',
				create: {
					route: 'create',
					page: '/dashboard/wiki/resources/my-resources/create',
				},
				edit: {
					route: ':requestId/edit',
					page: '/dashboard/wiki/resources/my-resources/:requestId/edit',
				},
				request: {
					route: ':requestId',
					page: '/dashboard/wiki/resources/my-resources/:requestId',
				},
			},
		},
	},
	docs: {
		route: 'docs',
		page: '/docs',
	},
	media: {
		route: 'media',
		page: '/media',
	},
	questions: {
		route: 'questions',
		page: '/questions',
		detail: {
			route: ':questionId',
			page: '/questions/:questionId',
		},
	},
	quiz: {
		route: 'quiz',
		page: '/quiz',
		new: {
			route: 'new',
			page: '/quiz/new',
		},
		result: {
			route: 'result',
			page: '/quiz/result',
		},
	},
	collections: {
		route: 'collections',
		page: '/collections',
		detail: {
			route: ':collectionId',
			page: '/collections/:collectionId',
		},
	},
	resources: {
		route: 'resources',
		page: '/resources',
	},
} as const;
