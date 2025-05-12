import { useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import { CollectionsPreviewSkeleton } from '@/entities/collection';

import styles from './CollectionsPage.module.css';

export const CollectionsPageSkeleton = () => {
	const { isMobileS } = useScreenSize();
	return (
		<section className={styles.wrapper}>
			<div className={styles['main-info-wrapper']}>
				<Card className={styles.content}>
					<div className={styles.title}>
						<Skeleton height={isMobileS ? 24 : 29} width={124} />
					</div>
					<Flex direction="column" gap="20">
						{[...Array(6)].map((_, i) => (
							<CollectionsPreviewSkeleton key={i} />
						))}
					</Flex>
				</Card>
			</div>
			<Card className={styles['additional-info-wrapper']}>
				<Skeleton height={48} width="100%" borderRadius={12} />
			</Card>
		</section>
	);
};
