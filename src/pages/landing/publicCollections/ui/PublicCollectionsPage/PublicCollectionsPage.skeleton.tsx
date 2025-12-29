import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { CollectionsFiltersSkeleton } from '@/features/collections/filterCollections';

import { CollectionsContentSkeleton } from '@/widgets/Collection';

import styles from './PublicCollectionsPage.module.css';

export const PublicCollectionsPageSkeleton = () => {
	return (
		<Flex gap="20" align="start" className={styles.wrapper}>
			<CollectionsContentSkeleton />
			<Card className={styles.filters}>
				<CollectionsFiltersSkeleton />
			</Card>
		</Flex>
	);
};
