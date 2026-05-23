import { Skeleton } from '@/shared/ui/Skeleton';

import { StatusChipSize } from './StatusChip';
import styles from './StatusChip.module.css';

interface StatusChipSkeletonProps {
	size?: StatusChipSize;
}

export const StatusChipSkeleton = ({ size = 'small' }: StatusChipSkeletonProps) => {
	return <Skeleton width={80} className={styles[`size-${size}`]} borderRadius={30} />;
};
