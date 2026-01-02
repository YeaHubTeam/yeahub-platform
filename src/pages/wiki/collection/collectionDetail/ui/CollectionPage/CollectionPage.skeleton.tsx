import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import { CollectionNavigationButtonsSkeleton } from '@/features/collection/navigateCollection';

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

				<Card className={styles['train-button']} withOutsideShadow>
					<Flex direction="column" gap="12">
						<div className={styles.actions}>
							{!isMobileS && <Skeleton width={160} height={40} borderRadius={12} />}
						</div>
						<CollectionNavigationButtonsSkeleton width={160} />
					</Flex>
				</Card>

				<CollectionBodySkeleton />
			</div>
			<AdditionalInfoSkeleton className={styles.additional} />
		</section>
	);
};
