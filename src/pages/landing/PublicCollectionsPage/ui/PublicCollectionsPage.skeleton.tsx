import { CollectionsContentSkeleton, CollectionsFiltersSkeleton } from '@/widgets/Collection';

import styles from './PublicCollectionsPage.module.css';

export const PublicCollectionsPageSkeleton = () => {
	return (
		<section className={styles.wrapper}>
			<CollectionsContentSkeleton />
			<CollectionsFiltersSkeleton />
		</section>
	);
};
