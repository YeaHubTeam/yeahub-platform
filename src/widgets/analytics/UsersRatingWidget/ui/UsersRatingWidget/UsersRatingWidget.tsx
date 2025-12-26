import { useTranslation } from 'react-i18next';

import { i18Namespace, Analytics } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { getSpecializationId } from '@/entities/profile';
import { useGetUsersRatingBySpecializationQuery } from '@/entities/user';

import { TOP_PLACES_COUNT } from '../../model/constants';
import { UserRatingItem } from '../UserRatingItem/UserRatingItem';

import styles from './UsersRatingWidget.module.css';
import { UsersRatingWidgetSkeleton } from './UsersRatingWidget.skeleton';

export const UsersRatingWidget = () => {
	const { t } = useTranslation(i18Namespace.analytics);
	const specializationId = String(useAppSelector(getSpecializationId));
	const { data, isLoading } = useGetUsersRatingBySpecializationQuery(specializationId);
	const topUsers = data?.users.slice(0, TOP_PLACES_COUNT) || [];
	const topUsersIsEmpty = topUsers.length === 0;
	const specialization = data?.specialization;
	const questionsCount = data?.questionsCount ?? 0;

	if (isLoading) return <UsersRatingWidgetSkeleton />;

	return (
		<Card
			className={styles.card}
			title={`${t(Analytics.TOP_USERS_TITLE_WIDGET)} ${specialization?.title}`}
			actionRoute="/"
			isActionPositionBottom
		>
			{!topUsersIsEmpty ? (
				<Flex direction="row" gap="16" align="end" justify="center">
					{topUsers.map((data, i) => (
						<UserRatingItem
							key={data.userId}
							userRating={data}
							place={(i + 1) as 1 | 2 | 3}
							questionsCount={questionsCount}
						/>
					))}
				</Flex>
			) : (
				<Text variant="body5-accent">{t(Analytics.TOP_USERS_NO_DATA_WIDGET)}</Text>
			)}
		</Card>
	);
};
