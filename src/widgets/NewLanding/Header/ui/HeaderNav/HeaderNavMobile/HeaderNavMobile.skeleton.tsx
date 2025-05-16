import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './HeaderNavMobile.module.css';

export const HeaderNavMobileSkeleton = () => {
	return <Skeleton className={styles.button} width={116} height={20} borderRadius={4} />;
};
