import { useTranslation } from 'react-i18next';

import { i18Namespace, Analytics, ROUTES } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { getSpecializationId } from '@/entities/profile';
import { useGetUsersRatingStatsQuery, useGetUsersRatingQuery } from '@/entities/user';

import { getRankedUsers } from '../../lib/getRankedUsers/getRankedUsers';
import { PRIZE_PLACES_COUNT } from '../../model/constants';
import type { PrizePlace } from '../../model/types';
import { UserRatingItem } from '../UserRatingItem/UserRatingItem';

import styles from './UsersRatingWidget.module.css';
import { UsersRatingWidgetSkeleton } from './UsersRatingWidget.skeleton';

export const UsersRatingWidget = () => {
	const { t } = useTranslation(i18Namespace.analytics);
	const specializationId = useAppSelector(getSpecializationId);
	const { data: ratingStats, isLoading: isLoadingStats } =
		useGetUsersRatingStatsQuery(specializationId);
	const { data: ratingData, isLoading: isLoadingRating } = useGetUsersRatingQuery({
		specializationId,
		page: 1,
		limit: 10,
	});

	const rankedUsers = getRankedUsers({ data: ratingData, limit: PRIZE_PLACES_COUNT });
	const rankedUsersIsEmpty = rankedUsers.length === 0;
	const specialization = ratingStats?.specialization;
	const questionsCount = ratingStats?.allQuestions ?? 0;

	if (isLoadingStats || isLoadingRating) return <UsersRatingWidgetSkeleton />;

	return (
		<Card
			className={styles.card}
			title={t(Analytics.USERS_RATING_TITLE_WIDGET, { specialization: specialization?.title })}
			actionRoute={ROUTES.analytics['users-rating'].route}
			isActionPositionBottom
		>
			{!rankedUsersIsEmpty ? (
				<Flex direction="row" gap="16" align="end" justify="center">
					{rankedUsers.map((data, i) => (
						<UserRatingItem
							key={data.userId}
							userRating={data}
							place={(i + 1) as PrizePlace}
							questionsCount={questionsCount}
						/>
					))}
				</Flex>
			) : (
				<Text variant="body5-accent">{t(Analytics.USERS_RATING_NO_DATA_WIDGET)}</Text>
			)}
		</Card>
	);
};
