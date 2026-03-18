import { Flex } from '@/shared/ui/Flex';

import type { UserRating } from '@/entities/user';

import {
	PLACE_ICONS,
	PRIZE_PLACES_COUNT,
	type PrizePlace,
} from '@/widgets/analytics/UsersRatingWidget';

import { UsersRatingProgressBar } from '../UsersRatingProgressBar/UsersRatingProgressBar';
import { UsersTitle } from '../UsersTitle/UsersTitle';

import styles from './CurrentUserRating.module.css';

interface CurrentUserRatingProps {
	user: UserRating;
	maxRating: number;
}

export const CurrentUserRating = ({ user, maxRating }: CurrentUserRatingProps) => {
	const isPrizePlace = user.place > 0 && user.place <= PRIZE_PLACES_COUNT;
	return (
		<div className={styles.wrapper}>
			<Flex direction="row" align="center">
				<Flex className={styles.index} justify="center">
					{user.place}
				</Flex>
				<Flex className={styles.place} justify="center">
					{isPrizePlace && (
						<img
							src={PLACE_ICONS[user.place as PrizePlace]}
							alt="medal"
							width="13px"
							height="20px"
						/>
					)}
				</Flex>
				<Flex className={styles.user}>
					<UsersTitle rankedUser={user} />
				</Flex>
				<Flex
					className={styles['questions-count']}
					justify="end"
				>{`${user.ratingPoints * 10}/${maxRating}`}</Flex>
				<Flex className={styles.progress}>
					<UsersRatingProgressBar rankedUser={user} maxRating={maxRating} />
				</Flex>
			</Flex>
		</div>
	);
};
