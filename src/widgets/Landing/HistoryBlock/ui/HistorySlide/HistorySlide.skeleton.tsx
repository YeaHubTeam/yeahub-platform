import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './HistorySlide.module.css';

export const HistorySlideSkeleton = () => {
	return (
		<Flex justify="center" align="center" className={styles['slide-item']}>
			<Flex direction="column" justify="center" align="center" className={styles['slide-card']}>
				<Skeleton className={styles['slide-image']} />
				<TextSkeleton width={'100%'} variant="body3" className={styles['slide-text']} />
			</Flex>
		</Flex>
	);
};
