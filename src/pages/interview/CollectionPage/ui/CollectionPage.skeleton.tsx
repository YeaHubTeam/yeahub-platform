import { useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Skeleton } from '@/shared/ui/Skeleton';

import {
	AdditionalInfoSkeleton,
	CollectionBodySkeleton,
	CollectionHeaderSkeleton,
} from '@/widgets/Collection';

import styles from './CollectionPage.module.css';

export const CollectionPageSkeleton = () => {
	const { isMobileS } = useScreenSize();

	return (
		<section className={styles.wrapper}>
			<div className={styles.main}>
				<CollectionHeaderSkeleton />
				{!isMobileS && (
					<Card className={styles['train-button']} withOutsideShadow>
						<div className={styles.actions}>
							<Skeleton width={160} height={40} borderRadius={12} />
						</div>
					</Card>
				)}
				<CollectionBodySkeleton />
			</div>
			<AdditionalInfoSkeleton className={styles.additional} />
		</section>
	);
};
