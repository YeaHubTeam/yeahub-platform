import { UserProfilePositionResponse, UserRating } from '../model/types/usersRating';

export const mapUserProfilePosition = (
	data?: UserProfilePositionResponse,
): UserRating | undefined => {
	if (!data) return undefined;

	return {
		userId: String(data.userId),
		username: data.username,
		avatarUrl: data.imageSrc,
		ratingScore: data.ratingPoints,
		place: data.place,
	};
};
