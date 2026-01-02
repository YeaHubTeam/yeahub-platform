import { useRef } from 'react';

import { useScreenSize, useTruncation } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';
import { Tooltip } from '@/shared/ui/Tooltip';

import type { UserRating } from '@/entities/user';

import { AVATAR_RADII, PLACE_ICONS } from '../../lib/constants/userRating';
import { AvatarWithRating } from '../AvatarWithRating/AvatarWithRating';

import styles from './UserRatingItem.module.css';

interface UserRatingItemProps {
	userRating: UserRating;
	place: 1 | 2 | 3;
	questionsCount: number;
}

export const UserRatingItem = ({ userRating, place, questionsCount }: UserRatingItemProps) => {
	const { isMobileS } = useScreenSize();
	const itemWidth = isMobileS ? AVATAR_RADII[1] * 1.5 : AVATAR_RADII[1] * 2;
	const nameRef = useRef(null);
	const isTruncated = useTruncation(nameRef, 'row');
	return (
		<Flex direction="column" align="center" gap="8" justify="center" style={{ width: itemWidth }}>
			<Flex justify="center" align="center" style={{ width: itemWidth, height: itemWidth }}>
				<AvatarWithRating
					avatarUrl={userRating.avatarUrl}
					score={userRating.ratingScore}
					radius={isMobileS ? AVATAR_RADII[place] / 1.5 : AVATAR_RADII[place]}
					maxRating={questionsCount}
				/>
			</Flex>

			<Card withOutsideShadow size="small" className={styles['user-rating']}>
				<Flex direction="column" align="center" gap="4">
					<Flex direction="row" gap="4" justify="center">
						<img src={PLACE_ICONS[place]} alt="place" width="13px" height="20px" />
						<Tooltip shouldShowTooltip={isTruncated} title={userRating.username} placement="bottom">
							<Text
								ref={nameRef}
								variant={isMobileS ? `body2-accent` : `body3-accent`}
								isLimitSize={true}
								className={styles['user-name']}
							>
								{userRating.username}
							</Text>
						</Tooltip>
					</Flex>
					<Text variant={isMobileS ? `body2-accent` : `body3-accent`}>
						{userRating.ratingScore}/{questionsCount}
					</Text>
				</Flex>
			</Card>
		</Flex>
	);
};
