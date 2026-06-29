import { ButtonSkeleton } from '@/shared/ui/Button';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './RegistrationLabel.module.css';

export const RegistrationLabelSkeleton = () => {
	return (
		<div className={styles.wrapper}>
			<Skeleton width={100} height={18} borderRadius={4} />
			<ButtonSkeleton variant="link" width={130} />
		</div>
	);
};
