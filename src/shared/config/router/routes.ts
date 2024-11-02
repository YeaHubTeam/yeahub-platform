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
		page: '/dashboard/profile',
		edit: {
			route: 'edit',
			page: '/dashboard/profile/edit',
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
		quiz: {
			route: 'quiz',
			page: '/dashboard/interview/quiz',
		},
		new: {
			route: 'new',
			page: '/dashboard/interview/new',
		},
	},
};
