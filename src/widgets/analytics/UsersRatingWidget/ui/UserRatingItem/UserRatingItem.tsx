import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import type { UserRating } from '@/entities/usersRating';

import { AVATAR_RADII, MAX_RATING, PLACE_ICONS } from '../../model/constants';
import { AvatarWithRating } from '../AvatarWithRating/AvatarWithRating';

import styles from './UserRatingItem.module.css';

interface UserRatingItemProps {
	userRating: UserRating;
	place: 1 | 2 | 3;
}

export const UserRatingItem = ({ userRating, place }: UserRatingItemProps) => {
	const { isMobileS } = useScreenSize();
	const itemWidth = isMobileS ? AVATAR_RADII[1] * 1.5 : AVATAR_RADII[1] * 2;
	return (
		<Flex direction="column" align="center" gap="8" justify="center" style={{ width: itemWidth }}>
			<Flex justify="center" align="center" style={{ width: itemWidth, height: itemWidth }}>
				<AvatarWithRating
					avatarUrl={userRating.avatarUrl}
					score={userRating.ratingScore}
					radius={isMobileS ? AVATAR_RADII[place] / 1.5 : AVATAR_RADII[place]}
				/>
			</Flex>

			<Card withOutsideShadow size="small" className={styles['user-rating']}>
				<Flex direction="column" align="center" gap="4">
					<Flex direction="row" gap="4" justify="center">
						<img src={PLACE_ICONS[place]} alt="place" width="13px" height="20px" />
						<Text
							variant={isMobileS ? `body2-accent` : `body3-accent`}
							className={styles['user-name']}
						>
							{userRating.username}
						</Text>
					</Flex>
					<Text
						variant={isMobileS ? `body2-accent` : `body3-accent`}
						className={styles['rating-score']}
					>
						{userRating.ratingScore}/{MAX_RATING}
					</Text>
				</Flex>
			</Card>
		</Flex>
	);
};
