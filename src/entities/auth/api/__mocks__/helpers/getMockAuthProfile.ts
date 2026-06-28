import { authMockProfilesByAccessToken } from '../data';

export const getMockAuthProfile = (request: Request) => {
	const authorizationHeader = request.headers.get('Authorization') ?? '';
	const accessToken = authorizationHeader.replace(/^Bearer\s+/i, '');
	return authMockProfilesByAccessToken[accessToken];
};
