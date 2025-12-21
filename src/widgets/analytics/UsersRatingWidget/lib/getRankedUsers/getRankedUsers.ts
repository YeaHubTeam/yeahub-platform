import type { UserRating, UsersRatingBySpecialization } from '@/entities/user';

interface getRankedUsersParams {
	data: UsersRatingBySpecialization | undefined;
	limit: number;
	page?: number;
}

export const getRankedUsers = ({ data, limit, page = 1 }: getRankedUsersParams): UserRating[] => {
	return data?.users ? [...data.users].slice(limit * (page - 1), limit * page) : [];
};
