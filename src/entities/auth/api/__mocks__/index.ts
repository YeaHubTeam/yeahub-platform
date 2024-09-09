import authLoginHandler from './authLoginHandler';
import authLogoutHandler from './authLogoutHandler';
import authProfileHandler from './authProfileHandler';
import authRefreshHandler from './authRefreshHandler';
import authSignupHandler from './authSignupHandler';

export const authHandlers = [
	authLoginHandler,
	authLogoutHandler,
	authProfileHandler,
	authRefreshHandler,
	authSignupHandler,
];
