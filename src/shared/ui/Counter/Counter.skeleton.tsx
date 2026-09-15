import { IconSkeleton } from '@/shared/ui/Icon';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './Counter.module.css';

export const CounterSkeleton = () => {
	return (
		<div className={styles.wrapper}>
			<IconSkeleton size={20} />
			<Skeleton height={20} width={20} className={styles.count} />
			<IconSkeleton size={20} />
		</div>
	);
};
