import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './ResourceCard.module.css';

export const ResourceCardSkeleton = () => {
	return (
		<Card withOutsideShadow className={styles.content}>
			<Flex className={styles.wrapper}>
				<Skeleton className={styles['image-wrapper']} />
				<Flex direction="column" gap="12" className={styles['right-block']}>
					<Skeleton height={20} width={'100%'} />
					<Skeleton height={20} width={'100%'} />
					<Skeleton height={20} width={'100%'} />
				</Flex>
			</Flex>
		</Card>
	);
};
