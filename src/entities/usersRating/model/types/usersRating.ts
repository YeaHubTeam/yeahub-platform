export interface UserRating {
	userId: string;
	username: string;
	avatarUrl: string;
	ratingScore: number;
}

export type UsersRating = UserRating[];

export type UsersRatingBySpecialization = {
	[specializationId: string]: UsersRating;
};

export type GetUsersRatingBySpecializationResponse = UsersRating;
