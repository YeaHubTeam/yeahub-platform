import { useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import { CollectionsPreviewSkeleton } from '@/entities/collection';

import { CollectionsFiltersDrawerSkeleton } from '../CollectionsFiltersDrawer/CollectionsFiltersDrawer.skeleton';

import styles from './CollectionsContent.module.css';

export const CollectionsContentSkeleton = () => {
	const { isMobileS } = useScreenSize();

	return (
		<div className={styles['main-info-wrapper']}>
			<Card className={styles.content}>
				<Flex justify="between" className={styles.header}>
					<Skeleton className={styles.title} height={isMobileS ? 24 : 29} width={124} />
					<CollectionsFiltersDrawerSkeleton />
				</Flex>
				<Flex direction="column" gap="20">
					{[...Array(6)].map((_, i) => (
						<CollectionsPreviewSkeleton key={i} />
					))}
				</Flex>
			</Card>
		</div>
	);
};
