import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './AvosPromo.module.css';

export const AvosPromoSkeleton = () => {
	const { isMobileS } = useScreenSize();

	return (
		<Card className={styles.wrapper} withOutsideShadow>
			<Flex justify="between" gap="20">
				<div>
					<TextSkeleton variant="body5" width="150px" />
					<TextSkeleton variant="body3" width="250px" className={styles.subtitle} />

					<Skeleton className={styles['tablet-screenshot']} width="100%" height={200} />

					<Flex wrap="wrap" gap={isMobileS ? '8' : '12'} className={styles.chips}>
						{new Array(5).map((_, i) => (
							<Skeleton key={i} width={isMobileS ? 80 : 100} height={32} borderRadius="16px" />
						))}
					</Flex>

					<TextSkeleton variant="body3" width="200px" className={styles.sum} />
					<Skeleton width={200} height={48} className={styles.button} borderRadius="8px" />
				</div>

				<Skeleton className={styles.screenshot} width={500} height={350} />
			</Flex>
		</Card>
	);
};
