import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './HeaderSkeleton.module.css';

export const HeaderSkeleton = () => {
	return (
		<div className={styles.wrap}>
			<Skeleton width="60px" height="22px" borderRadius="5px" />
			<Skeleton width="40px" height="40px" borderRadius="10px" />
		</div>
	);
};
