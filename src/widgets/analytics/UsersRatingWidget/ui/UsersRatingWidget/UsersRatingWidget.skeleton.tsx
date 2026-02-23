import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import type { PrizePlace } from '../../model/types';
import { UserRatingItemSkeleton } from '../UserRatingItem/UserRatingItem.skeleton';

import styles from './UsersRatingWidget.module.css';

export const UsersRatingWidgetSkeleton = () => {
	return (
		<CardSkeleton
			className={styles.card}
			title="title"
			actionRoute="actionRoute"
			isActionPositionBottom
		>
			<Flex direction="row" gap="16" align="end" justify="center">
				{[...Array(3)].map((_, i) => (
					<UserRatingItemSkeleton key={i} place={(i + 1) as PrizePlace} />
				))}
			</Flex>
		</CardSkeleton>
	);
};
