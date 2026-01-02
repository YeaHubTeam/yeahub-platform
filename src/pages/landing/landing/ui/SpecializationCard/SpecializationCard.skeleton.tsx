import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './SpecializationCard.module.css';

export const SpecializationCardSkeleton = () => {
	return (
		<Flex direction="column" justify="between" className={styles.card}>
			<Flex direction="row" justify="between" align="start" className={styles['card-title']}>
				<TextSkeleton variant="body6" width={101} />
				<Skeleton height={80} width={80} />
			</Flex>

			<Flex direction="column" justify="end">
				<TextSkeleton variant="body3" width="100%" className={styles['card-description']} />
				<ButtonSkeleton fullWidth className={styles['card-button']} />
			</Flex>
		</Flex>
	);
};
