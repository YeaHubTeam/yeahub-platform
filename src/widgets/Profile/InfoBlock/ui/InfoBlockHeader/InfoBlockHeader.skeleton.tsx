import { Skeleton } from '@/shared/ui/Skeleton';

import { UserEditButtonSkeleton } from '@/entities/user';

import styles from './InfoBlockHeader.module.css';

export const InfoBlockHeaderSkeleton = ({ isEdit }: { isEdit?: boolean }) => {
	return (
		<div className={styles['info-header']}>
			<Skeleton width={200} />
			{isEdit && <UserEditButtonSkeleton />}
		</div>
	);
};
