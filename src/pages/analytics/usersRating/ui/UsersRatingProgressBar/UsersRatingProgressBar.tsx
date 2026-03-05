import { getProgressColor } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { ProgressBar } from '@/shared/ui/ProgressBar';
import { Text } from '@/shared/ui/Text';

import type { UserRating } from '@/entities/user';

import styles from './UsersRatingProgressBar.module.css';

interface UsersRatingProgressBarProps {
	rankedUser: UserRating;
	maxRating: number;
}

export const UsersRatingProgressBar = ({ rankedUser, maxRating }: UsersRatingProgressBarProps) => {
	const userProgress = Math.floor((rankedUser.ratingScore / maxRating) * 100);
	return (
		<Flex direction="column" maxWidth>
			<Flex align="start">
				<Text variant="body1">{userProgress}%</Text>
			</Flex>
			<ProgressBar
				currentCount={rankedUser.ratingScore}
				totalCount={maxRating}
				variant="medium"
				color={getProgressColor(userProgress)}
				className={styles['progress-bar']}
			/>
		</Flex>
	);
};
