import type {
	GetUsersRatingResponse,
	UserRating,
	UsersRatingBySpecialization,
} from '@/entities/user';

interface getRankedUsersParams {
	data: UsersRatingBySpecialization | GetUsersRatingResponse | undefined;
	limit: number;
	page?: number;
}

const extractUsersArray = (
	data: UsersRatingBySpecialization | GetUsersRatingResponse | undefined,
): UserRating[] => {
	if (!data) return [];
	if ('users' in data) {
		return data.users || [];
	}
	if ('data' in data) {
		return data.data || [];
	}
	return [];
};

export const getRankedUsers = ({ data, limit, page = 1 }: getRankedUsersParams): UserRating[] => {
	const users = extractUsersArray(data);
	return users.length ? [...users].slice(limit * (page - 1), limit * page) : [];
};
