export const ROUTES = {
	appRoute: '/',
	adminRoute: '/admin/',
	admin: {
		questions: {
			route: 'questions',
			page: '/admin/questions',
		},
		skills: {
			route: 'skills',
			page: '/admin/skills',
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
