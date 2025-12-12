import type { Specialization } from '@/entities/specialization/@x/user';

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
