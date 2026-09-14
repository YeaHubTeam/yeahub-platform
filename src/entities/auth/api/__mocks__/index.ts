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

export {
	authMockProfilesByAccessToken,
	authMockAuthorsByAccessToken,
	mockAdminRoleAuthor,
	mockAuthorRoleAuthor,
} from './data';
export { getMockAuthProfile } from './helpers/getMockAuthProfile';
export { getMockAuthAuthor } from './helpers/getMockAuthAuthor';
