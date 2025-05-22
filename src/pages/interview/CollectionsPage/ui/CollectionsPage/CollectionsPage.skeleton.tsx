import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { CollectionsContentSkeleton, CollectionsFilterPanelSkeleton } from '@/widgets/Collection';

import styles from './CollectionsPage.module.css';

export const CollectionsPageSkeleton = () => {
	return (
		<Flex gap="20" align="start" className={styles.wrapper}>
			<CollectionsContentSkeleton />
			<Card className={styles.filters}>
				<CollectionsFilterPanelSkeleton />
			</Card>
		</Flex>
	);
};
