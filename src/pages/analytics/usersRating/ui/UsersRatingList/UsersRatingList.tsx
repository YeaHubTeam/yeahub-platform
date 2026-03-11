import { useTranslation } from 'react-i18next';

import { i18Namespace, Analytics } from '@/shared/config';

import type { UserRating } from '@/entities/user';

import {
	AnalyticPageTemplateMobileList,
	AnalyticPageTemplateMobileListItem,
} from '@/widgets/analytics/AnalyticPageTemplate';

import { UsersRatingProgressBar } from '../UsersRatingProgressBar/UsersRatingProgressBar';
import { UsersTitle } from '../UsersTitle/UsersTitle';

interface UsersRatingListProps {
	rankedUsers: UserRating[];
	maxRating: number;
	currentUserRating?: UserRating;
}

export const UsersRatingList = ({
	rankedUsers,
	maxRating,
	currentUserRating,
}: UsersRatingListProps) => {
	const { t } = useTranslation([i18Namespace.analytics]);

	const rankedUsersFields: AnalyticPageTemplateMobileListItem[] = rankedUsers.map((rankedUser) => {
		const isCurrentUser = rankedUser.userId === currentUserRating?.userId;

		const safeStudiedQuestions = Math.min(rankedUser.ratingScore, maxRating);

		return {
			title: <UsersTitle rankedUser={rankedUser} />,
			fields: [
				{
					label: t(Analytics.USERS_RATING_ANSWERS),
					value: `${safeStudiedQuestions}/${maxRating}`,
				},
			],
			suffix: <UsersRatingProgressBar rankedUser={rankedUser} maxRating={maxRating} />,
			isCurrentUser,
		};
	});

	return <AnalyticPageTemplateMobileList items={rankedUsersFields} />;
};
