import { BaseFilterSectionSkeleton } from '@/shared/ui/BaseFilterSection';
import { ButtonSkeleton } from '@/shared/ui/Button';

import styles from './ResourcesTypesFilterSection.module.css';

export const ResourcesTypesFilterSectionSkeleton = () => {
	return (
		<div className={styles.wrapper}>
			<BaseFilterSectionSkeleton length={4} width={100} />
			<ButtonSkeleton className={styles.button} variant="link" />
		</div>
	);
};
