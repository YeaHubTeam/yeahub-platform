import { TNullable } from '@/shared/types/types';

export type GetProfileApiResponse = {
	id: string;
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	country: string;
	city: string;
	address: string;
	avatarUrl: string;
	birthday: string;
	updatedAt: string;
	createdAt: string;
	profiles: Profile[];
};

export interface Profile {
	profileId: string;
	specializationID: number;
}

export type GetRefreshTokenApiResponse = {
	access_token: string;
	user: GetProfileApiResponse;
};

export type AuthState = {
	profile: TNullable<GetProfileApiResponse>;
	accessToken: TNullable<string>;
};

export interface ExtraArgument {
	navigate: (path: string) => void;
}
