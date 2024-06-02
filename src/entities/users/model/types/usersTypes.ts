export type User = {
	id: string;
	firstName: string;
	lastName: string;
	avatarUrl: string;
	createdAt: string;
	updatedAt: string;
	profile: {
		id: string;
	};
};

export type GetUsersApiResponse = User[];
