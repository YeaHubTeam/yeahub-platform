import { Flex } from '@/shared/ui/Flex';

import { FilterChipSkeleton } from '../FilterChip/FilterChip.skeleton';

import styles from './FiltersBlock.module.css';

export const FiltersBlockSkeleton = () => (
	<div className={styles.list}>
		<Flex gap="14" className={styles['slider-container']}>
			{Array.from({ length: 6 }).map((_, i) => (
				<FilterChipSkeleton key={i} />
			))}
		</Flex>
	</div>
);
