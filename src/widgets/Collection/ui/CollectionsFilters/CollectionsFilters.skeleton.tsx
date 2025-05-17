import { Card } from '@/shared/ui/Card';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './CollectionsFilters.module.css';

export const CollectionsFiltersSkeleton = () => {
	return (
		<Card className={styles['additional-info-wrapper']}>
			<Skeleton height={48} width="100%" borderRadius={12} />
		</Card>
	);
};
