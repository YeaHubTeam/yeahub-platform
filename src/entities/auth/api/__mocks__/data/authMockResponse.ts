import { AuthResponse, ProfileResponse } from '../../../model/types/auth';

import {
	adminAuthMockResponse,
	adminCredentials,
	adminProfileMockResponse,
} from './adminMockResponse';
import {
	authorAuthMockResponse,
	authorCredentials,
	authorProfileMockResponse,
} from './authorMockResponse';
import {
	userFreeAuthMockResponse,
	userFreeCredentials,
	userFreeProfileMockResponse,
} from './userFreeMockResponse';
import {
	userPremiumAuthMockResponse,
	userPremiumCredentials,
	userPremiumProfileMockResponse,
} from './userPremiumMockResponse';
import {
	userUnverifiedAuthMockResponse,
	userUnverifiedCredentials,
	userUnverifiedProfileMockResponse,
} from './userUnverifiedMockResponse';

export const authMockResponse: AuthResponse = {} as AuthResponse;

export const authMockPasswordsByEmail: Record<string, string> = {
	[adminCredentials.username]: adminCredentials.password,
	[authorCredentials.username]: authorCredentials.password,
	[userFreeCredentials.username]: userFreeCredentials.password,
	[userPremiumCredentials.username]: userPremiumCredentials.password,
	[userUnverifiedCredentials.username]: userUnverifiedCredentials.password,
};

export const authMockResponsesByEmail: Record<string, AuthResponse> = {
	[adminCredentials.username]: adminAuthMockResponse,
	[authorCredentials.username]: authorAuthMockResponse,
	[userFreeCredentials.username]: userFreeAuthMockResponse,
	[userPremiumCredentials.username]: userPremiumAuthMockResponse,
	[userUnverifiedCredentials.username]: userUnverifiedAuthMockResponse,
};

export const authMockProfilesByAccessToken: Record<string, ProfileResponse> = {
	[adminAuthMockResponse.access_token]: adminProfileMockResponse,
	[authorAuthMockResponse.access_token]: authorProfileMockResponse,
	[userFreeAuthMockResponse.access_token]: userFreeProfileMockResponse,
	[userPremiumAuthMockResponse.access_token]: userPremiumProfileMockResponse,
	[userUnverifiedAuthMockResponse.access_token]: userUnverifiedProfileMockResponse,
};
