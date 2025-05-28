import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './SpecializationCard.module.css';

export const SpecializationCardSkeleton = () => {
	return (
		<Flex direction="column" justify="between" className={styles.card}>
			<Flex direction="row" justify="between" align="start" className={styles['card-title']}>
				<Skeleton height={28} width={101} />
				<Skeleton height={80} width={80} />
			</Flex>

			<Flex direction="column" justify="end">
				<Skeleton height={18} width="100%" className={styles['card-description']} />
				<Skeleton height={44} width="100%" className={styles['card-button']} />
			</Flex>
		</Flex>
	);
};
