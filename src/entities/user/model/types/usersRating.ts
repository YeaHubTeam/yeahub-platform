import { Response } from '@/shared/libs';

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

export type GetUsersRatingRequest = {
	specializationId: number;
	page?: number;
	limit?: number;
};

export type GetUsersRatingResponse = Response<UserRating[]>;

export type GetUsersRatingStatsResponse = {
	allUsers: number;
	averageProgress: number;
	allQuestions: number;
	specialization: Specialization;
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
