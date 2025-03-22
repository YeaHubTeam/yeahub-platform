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
			page: 'admin/users',
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
		quiz: {
			route: 'quiz',
			page: '/dashboard/interview/quiz',
		},
		new: {
			route: 'new',
			page: '/dashboard/interview/new',
		},
	},
	docs: {
		route: 'docs',
		page: '/docs',
	},
	questions: {
		route: 'questions',
		page: '/questions',
		detail: {
			route: ':questionId',
			page: '/questions/:questionId',
		},
	},
	collections: {
		route: 'collections',
		page: '/collections',
		detail: {
			route: ':collectionsId',
			page: '/collections/:collectionId',
		},
	},
};
