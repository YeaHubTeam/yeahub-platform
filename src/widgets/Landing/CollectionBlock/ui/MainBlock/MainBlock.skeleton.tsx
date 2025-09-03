import { useScreenSize } from '@/shared/hooks';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './MainBlock.module.css';

export const MainBlockSkeleton = () => {
	const { isMobile } = useScreenSize();

	const CardPreviewSkeleton = () => (
		<CardSkeleton withOutsideShadow size="medium">
			<Flex direction="column" gap="12" maxWidth>
				<Skeleton height={200} borderRadius={12} width={340} />
				<Skeleton width={60} height={20} borderRadius={10} />
				<Skeleton width="90%" height={18} />
				<Skeleton width="70%" height={18} />
				<Skeleton width={120} height={16} />
				<Skeleton width={80} height={16} />
			</Flex>
		</CardSkeleton>
	);

	const cards = Array.from({ length: 3 }, (_, i) => <CardPreviewSkeleton key={i} />);

	if (isMobile) {
		return (
			<Flex gap="20" direction="column" className={styles['main-block']}>
				{cards}
			</Flex>
		);
	}

	return (
		<div className={styles['main-block']}>
			<Flex gap="20" className={styles['slider-container']}>
				{cards}
			</Flex>
		</div>
	);
};
