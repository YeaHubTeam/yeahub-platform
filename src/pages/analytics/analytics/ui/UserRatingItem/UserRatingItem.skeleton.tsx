import { useScreenSize } from '@/shared/libs';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import { AVATAR_RADII } from '../../lib/constants/userRating';
import { AvatarWithRatingSkeleton } from '../AvatarWithRating/AvatarWithRating.skeleton';

import styles from './UserRatingItem.module.css';

interface UserRatingItemPropsSkeleton {
	place: 1 | 2 | 3;
}

export const UserRatingItemSkeleton = ({ place }: UserRatingItemPropsSkeleton) => {
	const { isMobileS } = useScreenSize();
	const itemWidth = isMobileS ? AVATAR_RADII[1] * 1.5 : AVATAR_RADII[1] * 2;
	return (
		<Flex direction="column" align="center" gap="8" justify="center" style={{ width: itemWidth }}>
			<Flex justify="center" align="center" style={{ width: itemWidth, height: itemWidth }}>
				<AvatarWithRatingSkeleton
					radius={isMobileS ? AVATAR_RADII[place] / 1.5 : AVATAR_RADII[place]}
				/>
			</Flex>
			<CardSkeleton withOutsideShadow size="small" className={styles['user-rating']}>
				<Flex direction="column" align="center" gap="6">
					<TextSkeleton width="80%" variant={isMobileS ? `body2-accent` : `body3-accent`} />
					<TextSkeleton width="80%" variant={isMobileS ? `body2-accent` : `body3-accent`} />
				</Flex>
			</CardSkeleton>
		</Flex>
	);
};
