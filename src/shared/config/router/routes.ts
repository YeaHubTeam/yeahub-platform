export const ROUTES = {
	appRoute: '/',
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
		},
		statistic: {
			route: 'statistic',
			page: '/interview/statistic',
		},
		questions: {
			route: 'questions',
			page: '/interview/questions',
		},
		quiz: {
			route: 'quiz',
			page: '/interview/quiz',
			new: {
				route: 'new',
				page: '/interview/quiz/new',
			},
		},
	},
};
