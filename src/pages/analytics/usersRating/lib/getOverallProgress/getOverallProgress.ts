import type { UsersRatingBySpecialization } from '@/entities/user';

export const getOverallProgress = (data: UsersRatingBySpecialization | undefined) => {
	const usersCount = data?.users.length;
	const progressSum = data?.users.reduce((sum, user) => sum + user.ratingScore, 0);
	const averageProgress = progressSum && usersCount ? progressSum / usersCount : 0;
	return data?.questionsCount ? Math.floor((averageProgress / data?.questionsCount) * 100) : 0;
};
