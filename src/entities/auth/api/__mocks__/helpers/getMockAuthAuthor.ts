import { authMockAuthorsByAccessToken } from '../data';

export const getMockAuthAuthor = (request: Request) => {
	const authorizationHeader = request.headers.get('Authorization') ?? '';
	const accessToken = authorizationHeader.replace(/^Bearer\s+/i, '');
	return authMockAuthorsByAccessToken[accessToken];
};
