// export type RouteName =
//   | "appRoute"
//   | "projectsRoute"
//   | "authRoute"
//   | "loginRoute"
//   | "passwordRoute"
//   | "loginPage"
//   | "passwordPage"
//   | "errorRoute"
//   | "error404Route"
//   | "errorLicenseRoute"
//   | "error404Page"
//   | "errorLicensePage"
//   | "projectRoute"
//   | "lastScansPage";

// export type RoutesList = Partial<Record<RouteName, string>>;

// export const ROUTES = {
// 	appRoute: '/',
// 	authRoute: '/auth',
// 	loginRoute: 'login',
// 	registerRoute: 'register',
// 	loginPage: '',
// 	registerPage: '',
// 	interviewRoute: '/interview',
// 	inter
// projectsRoute: '/',
// passwordRoute: 'password',
// errorRoute: '/error',
// error404Route: '404',
// errorLicenseRoute: 'license',
// projectRoute: '/project',
// lastScansPage: '/last-scans',
// };

// ROUTES.loginPage = `${ROUTES.authRoute}/${ROUTES.loginRoute}`;
// ROUTES.registerPage = `${ROUTES.authRoute}/${ROUTES.registerRoute}`;

// ROUTES.error404Page = `${ROUTES.errorRoute}/${ROUTES.error404Route}`;
// ROUTES.errorLicensePage = `${ROUTES.errorRoute}/${ROUTES.errorLicenseRoute}`;

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
