import { BaseFilterSectionSkeleton } from '@/shared/ui/BaseFilterSection';
import { ButtonSkeleton } from '@/shared/ui/Button';

import styles from './ResourcesFilterSection.module.css';

export const ResourcesFilterSectionSkeleton = () => {
	return (
		<div className={styles.wrapper}>
			<BaseFilterSectionSkeleton length={4} width={100} />
			<ButtonSkeleton className={styles.button} variant="link" />
		</div>
	);
};
