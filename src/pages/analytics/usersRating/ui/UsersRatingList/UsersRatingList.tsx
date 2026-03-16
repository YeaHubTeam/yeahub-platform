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

	const hasCurrentUserInPage = rankedUsers.some(
		(user) => user.userId === currentUserRating?.userId,
	);

	const mapUserToItem = (
		rankedUser: UserRating,
		isCurrentUser: boolean,
	): AnalyticPageTemplateMobileListItem => ({
		title: <UsersTitle rankedUser={rankedUser} />,
		fields: [
			{
				label: t(Analytics.USERS_RATING_ANSWERS),
				value: `${rankedUser.ratingPoints}/${maxRating}`,
			},
		],
		suffix: <UsersRatingProgressBar rankedUser={rankedUser} maxRating={maxRating} />,
		isCurrentUser,
	});

	const rankedUsersFields = rankedUsers.map((user) =>
		mapUserToItem(user, user.userId === currentUserRating?.userId),
	);

	const currentUserItem =
		currentUserRating && !hasCurrentUserInPage ? mapUserToItem(currentUserRating, true) : null;

	return (
		<>
			<AnalyticPageTemplateMobileList items={rankedUsersFields} />

			{currentUserItem && <AnalyticPageTemplateMobileList items={[currentUserItem]} />}
		</>
	);
};
