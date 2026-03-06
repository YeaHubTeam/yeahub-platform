import type { Specialization } from '@/entities/specialization/@x/user';

export interface UserRating {
	userId: string;
	username: string;
	avatarUrl: string;
	ratingScore: number;
	place: number;
}

export type UsersRatingBySpecialization = {
	specialization: Specialization;
	questionsCount: number;
	users: UserRating[];
	updatedAt: string;
};

export type GetUsersRatingBySpecializationResponse = UsersRatingBySpecialization;

export interface UserProfilePositionResponse {
	userId: string;
	username: string;
	imageSrc: string;
	specialization: string;
	place: number;
	ratingPoints: number;
	progress: number;
	allUsers: number;
}
