import { AuthResponse, ProfileResponse, AuthorResponse } from '../../../model/types/auth';

import { adminAuthMockResponse, adminProfileMockResponse } from './adminMockResponse';
import { authorAuthMockResponse, authorProfileMockResponse } from './authorMockResponse';
import { userFreeAuthMockResponse, userFreeProfileMockResponse } from './userFreeMockResponse';
import {
	userPremiumAuthMockResponse,
	userPremiumProfileMockResponse,
} from './userPremiumMockResponse';
import {
	userUnverifiedAuthMockResponse,
	userUnverifiedProfileMockResponse,
} from './userUnverifiedMockResponse';

export const authMockResponse: AuthResponse = userUnverifiedAuthMockResponse;

export const authMockPasswordsByEmail: Record<string, string> = {
	'admin@yeahub.ru': 'Password123!',
	'author@yeahub.ru': 'Password123!',
	'user-free@yeahub.ru': 'Password123!',
	'user-premium@yeahub.ru': 'Password123!',
	'user-unverified@yeahub.ru': 'Password123!',
};

export const authMockResponsesByEmail: Record<string, AuthResponse> = {
	'admin@yeahub.ru': adminAuthMockResponse,
	'author@yeahub.ru': authorAuthMockResponse,
	'user-free@yeahub.ru': userFreeAuthMockResponse,
	'user-premium@yeahub.ru': userPremiumAuthMockResponse,
	'user-unverified@yeahub.ru': userUnverifiedAuthMockResponse,
};

export const authMockProfilesByAccessToken: Record<string, ProfileResponse> = {
	[adminAuthMockResponse.access_token]: adminProfileMockResponse,
	[authorAuthMockResponse.access_token]: authorProfileMockResponse,
	[userFreeAuthMockResponse.access_token]: userFreeProfileMockResponse,
	[userPremiumAuthMockResponse.access_token]: userPremiumProfileMockResponse,
	[userUnverifiedAuthMockResponse.access_token]: userUnverifiedProfileMockResponse,
};

export const authMockAuthorsByAccessToken: Record<string, AuthorResponse> = {
	[adminAuthMockResponse.access_token]: {
		id: adminProfileMockResponse.id,
		username: adminProfileMockResponse.username,
	},
	[authorAuthMockResponse.access_token]: {
		id: authorProfileMockResponse.id,
		username: authorProfileMockResponse.username,
	},
};
