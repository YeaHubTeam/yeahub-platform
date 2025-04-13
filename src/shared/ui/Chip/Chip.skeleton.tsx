import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './Chip.module.css';

export const ChipSkeleton = () => {
	return <Skeleton width={80} className={styles['chip-wrapper']} />;
};
