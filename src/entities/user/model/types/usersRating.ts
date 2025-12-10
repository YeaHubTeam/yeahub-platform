export interface Specialization {
	id: number;
	title: string;
	description: string;
	imageSrc?: string | null;
	createdAt?: string;
	updatedAt?: string;
}

export interface UserRating {
	userId: string;
	username: string;
	avatarUrl: string;
	ratingScore: number;
}

export type UsersRatingBySpecialization = {
	specialization: Specialization;
	questionsCount: number;
	users: UserRating[];
};

export type GetUsersRatingBySpecializationResponse = UsersRatingBySpecialization;
