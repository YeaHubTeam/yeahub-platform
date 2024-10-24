export const ROUTES = {
	appRoute: '/',
	adminRoute: '/admin/',
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
		specialization: {
			route: 'specialization',
			page: '/admin/specialization',
		},
		skills: {
			route: 'skills',
			page: '/admin/skills',
			create: {
				route: 'create',
				page: '/admin/skills/create',
			},
			detail: {
				route: ':skillId',
				page: '/admin/skills/:skillId',
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
	},
	profile: {
		route: 'profile',
		page: '/profile',
		edit: {
			route: 'edit',
			page: '/profile/edit',
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
		questions: {
			route: 'questions',
			page: '/interview/questions',
			detail: {
				route: ':questionId',
				page: '/interview/questions/:questionId',
			},
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
};
