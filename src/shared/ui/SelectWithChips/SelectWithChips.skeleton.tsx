import { ChipSkeleton } from '@/shared/ui/Chip';
import { DropdownSkeleton } from '@/shared/ui/Dropdown';

import styles from './SelectWithChips.module.css';

export const SelectWithChipsSkeleton = () => {
	return (
		<div className={styles.wrapper}>
			<DropdownSkeleton />
			<ChipSkeleton disabled variant="big" label="..." withText={90} />
		</div>
	);
};
