import { CollectionsContentSkeleton, CollectionsFiltersSkeleton } from '@/widgets/Collection';

import styles from './CollectionsPage.module.css';

export const CollectionsPageSkeleton = () => {
	return (
		<section className={styles.wrapper}>
			<CollectionsContentSkeleton />
			<CollectionsFiltersSkeleton />
		</section>
	);
};
