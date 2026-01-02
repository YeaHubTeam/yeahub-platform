import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';

import { CollectionsPreviewSkeleton } from '@/entities/collection';

import styles from './MainBlock.module.css';

export const MainBlockSkeleton = () => {
	const { isMobile, isTablet } = useScreenSize();

	const cards = Array.from({ length: isTablet ? 2 : 3 }, (_, i) => (
		<CollectionsPreviewSkeleton key={i} variant="column" />
	));

	if (isMobile) {
		return (
			<Flex gap="20" direction="column" className={styles['main-block']}>
				{cards}
			</Flex>
		);
	}

	return (
		<Flex gap="20" className={styles['main-block']}>
			{cards}
		</Flex>
	);
};
