import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './UserPreferences.module.css';

export const UserPreferencesSkeleton = () => {
	return (
		<div className={styles.preferences}>
			<Skeleton width={'32px'} height={'32px'} />
			<Skeleton width={'70px'} height={'30px'} />
			<Skeleton width={'40px'} height={'40px'} />
		</div>
	);
};
