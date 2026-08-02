import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './UserImageBlock.module.css';

export const UserImageBlockSkeleton = () => {
	return (
		<div className={styles['card-image']}>
			<Skeleton width={170} height={188} borderRadius={20} />
		</div>
	);
};
