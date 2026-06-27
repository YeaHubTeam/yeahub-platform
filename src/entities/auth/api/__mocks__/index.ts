import { authLoginMutationMock } from './authLoginMutationMock';
import { authLogoutQueryMock } from './authLogoutQueryMock';
import { authProfileQueryMock } from './authProfileQueryMock';
import { authRefreshQueryMock } from './authRefreshQueryMock';
import { authSignupMutationMock } from './authSignupMutationMock';

export const authHandlers = [
	authLoginMutationMock(),
	authLogoutQueryMock(),
	authProfileQueryMock(),
	authRefreshQueryMock(),
	authSignupMutationMock(),
];
