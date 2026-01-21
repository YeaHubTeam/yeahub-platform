import { Card } from '@/shared/ui/Card';
import { FiltersDrawerSkeleton } from '@/shared/ui/FiltersDrawer';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import { CollectionsFiltersSkeleton } from '@/features/collections/filterCollections';

import { CollectionsListSkeleton } from '@/widgets/Collection';

import styles from './CollectionsPage.module.css';

export const CollectionsPageSkeleton = () => {
	return (
		<Flex gap="20" align="start" className={styles.wrapper}>
			<div className={styles['main-info-wrapper']}>
				<Card className={styles.content}>
					<Flex justify="between" className={styles.header}>
						<TextSkeleton variant="body6" width={124} />
						<FiltersDrawerSkeleton />
					</Flex>
					<CollectionsListSkeleton />
				</Card>
			</div>
			<Card className={styles.filters}>
				<CollectionsFiltersSkeleton />
			</Card>
		</Flex>
	);
};
