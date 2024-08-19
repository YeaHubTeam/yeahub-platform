import { TNullable } from 'yeahub-ui-kit/build/hooks/useDialog';

export interface Auth {
	username: string;
	password: string;
}

export interface SignUp {
	firstName: string;
	lastName: string;
	password: string;
	phone: string;
	email: string;
	country: string | null;
	city: string | null;
	birthday: string | null;
	address: string | null;
	avatarUrl: string | null;
}

export interface AuthState {
	accessToken: TNullable<string>;
	profile: TNullable<GetProfileResponse>;
	error: TNullable<number>;
}

export interface GetProfileResponse extends Omit<SignUp, 'password'> {
	id: string;
	updatedAt: string;
	createdAt: string;
	profiles: Profile[];
}

export interface GetAuthResponse {
	access_token: string;
	user: GetProfileResponse;
}

export interface Profile {
	profileId: string;
	specializationID: number;
}
