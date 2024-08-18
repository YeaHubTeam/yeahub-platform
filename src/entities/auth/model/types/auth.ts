import { TNullable } from 'yeahub-ui-kit/build/hooks/useDialog';

export interface Auth {
	username: string;
	password: string;
}

export interface AuthState {
	accessToken: TNullable<string>;
	profile: TNullable<GetProfileResponse>;
	error: TNullable<number>;
}

export interface GetProfileResponse {
	id: string;
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	country: string | null;
	city: string | null;
	birthday: string | null;
	address: string | null;
	avatarUrl: string | null;
	updatedAt: string;
	createdAt: string;
	profiles: Profile[];
}

export interface GetLoginResponse {
	access_token: string;
	user: GetProfileResponse;
}

export interface Profile {
	profileId: string;
	specializationID: number;
}
