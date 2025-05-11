import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './HeaderAuthMobile.module.css';

export const HeaderAuthMobileSkeleton = () => {
	return <Skeleton className={styles['burger-button']} width={30} height={30} />;
};
