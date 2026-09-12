import { SelectWithChipsSkeleton } from '@/shared/ui/SelectWithChips';

import styles from './RoleSelect.module.css';

export const RoleSelectSkeleton = () => {
	return (
		<div className={styles.container}>
			<SelectWithChipsSkeleton />
		</div>
	);
};
