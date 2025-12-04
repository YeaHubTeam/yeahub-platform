import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './ProgressBlock.module.css';

export const ProgressBlockSkeleton = () => {
	return (
		<CardSkeleton withOutsideShadow>
			<Flex direction="column" gap="16">
				<TextSkeleton width={100} variant="body5-accent" />
				<TextSkeleton width={150} variant="body1-accent" />
			</Flex>
			<div className={styles['progress-bar-wrapper']}>
				{[...Array(3)].map((_, index) => (
					<Skeleton key={index} className={styles['progress-bar-item']} />
				))}
			</div>
		</CardSkeleton>
	);
};
