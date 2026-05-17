import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './UserEditButton.module.css';

export const UserEditButtonSkeleton = () => {
	return (
		<div style={{ flex: '1 0' }} className={styles['skeleton-link-profile']}>
			<div className={styles['skeleton-link']}>
				<Skeleton width="100%" height="100%" />
			</div>
		</div>
	);
};
