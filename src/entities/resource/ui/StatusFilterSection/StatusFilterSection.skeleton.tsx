import { BaseFilterSectionSkeleton } from '@/shared/ui/BaseFilterSection';

import styles from './StatusFilterSection.module.css';

export const StatusFilterSectionSkeleton = () => {
	return (
		<div className={styles.wrapper}>
			<BaseFilterSectionSkeleton length={1} width={150} />
		</div>
	);
};
