import { ChipSkeleton } from '@/shared/ui/Chip';
import { IconSkeleton } from '@/shared/ui/Icon';

import styles from './FilterChip.module.css';

export const FilterChipSkeleton = () => {
	return (
		<ChipSkeleton
			variant="big"
			className={styles.chip}
			label="..."
			withText={60}
			prefix={<IconSkeleton size={20} />}
		/>
	);
};
