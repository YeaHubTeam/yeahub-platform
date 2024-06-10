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
	refreshToken: string | null;
	birthday: string;
	updatedAt: string;
	createdAt: string;
};

export type AuthState = {
	profileDetail: GetProfileApiResponse | null;
};
