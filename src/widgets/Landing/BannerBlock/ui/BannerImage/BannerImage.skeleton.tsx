import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './BannerImage.module.css';

export const BannerImageSkeleton = () => {
	return <Skeleton className={styles['img-wrapper']} />;
};
