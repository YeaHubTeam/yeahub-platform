export const ROUTES = {
	appRoute: '/',
	platformRoute: '/dashboard',
	adminRoute: '/dashboard/admin/',
	admin: {
		questions: {
			route: 'questions',
			page: '/dashboard/admin/questions',
			create: {
				route: 'create',
				page: '/dashboard/admin/questions/create',
			},
			details: {
				route: ':questionId',
				page: '/dashboard/admin/questions/:questionId',
			},
			edit: {
				route: ':questionId/edit',
				page: '/dashboard/admin/questions/:questionId/edit',
			},
		},
		specialization: {
			route: 'specialization',
			page: '/dashboard/admin/specialization',
		},
		skills: {
			route: 'skills',
			page: '/dashboard/admin/skills',
			create: {
				route: 'create',
				page: '/dashboard/admin/skills/create',
			},
			detail: {
				route: ':skillId',
				page: '/dashboard/admin/skills/:skillId',
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
