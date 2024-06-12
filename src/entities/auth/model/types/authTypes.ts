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
};

export type GetRefreshTokenApiResponse = {
	access_token: string;
	user: GetProfileApiResponse;
};

export type AuthState = {
	profile: GetProfileApiResponse | null;
	accessToken: string | null;
};

export interface ExtraArgument {
	navigate: (path: string) => void;
}
