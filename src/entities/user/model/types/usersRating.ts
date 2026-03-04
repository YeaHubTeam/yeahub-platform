import type { Specialization } from '@/entities/specialization/@x/user';

export interface UserRating {
	userId: string;
	username: string;
	avatarUrl: string;
	ratingPoints: number;
	place: number;
	progress: number;
}

export type UsersRatingBySpecialization = {
	specialization: Specialization;
	questionsCount: number;
	users: UserRating[];
	updatedAt: string;
};

export type GetUsersRatingResponse = {
	data: UserRating[];
	total: number;
	page: number;
	limit: number;
};

export type GetUsersRatingStatsResponse = {
	allUsers: number;
	averageProgress: number;
	allQuestions: number;
	specialization: Specialization;
};

export type GetUsersRatingBySpecializationResponse = UsersRatingBySpecialization;
