import classNames from 'classnames';

import { useScreenSize } from '@/shared/hooks';
import { BaseFilterSectionSkeleton } from '@/shared/ui/BaseFilterSection';
import { ButtonSkeleton } from '@/shared/ui/Button';

import styles from './ChooseCollectionSpecialization.module.css';

export const ChooseCollectionSpecializationSkeleton = () => {
	const { isMobile } = useScreenSize();

	return (
		<div className={classNames(styles.wrapper, { [styles.mobile]: isMobile })}>
			<BaseFilterSectionSkeleton length={5} width={150} />
			{!isMobile && <ButtonSkeleton className={styles.button} variant="link" />}
		</div>
	);
};
