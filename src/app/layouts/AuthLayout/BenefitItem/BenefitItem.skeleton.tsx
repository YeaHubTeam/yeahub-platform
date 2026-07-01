import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './BenefitItem.module.css';

export const BenefitItemSkeleton = () => {
	return (
		<li className={styles['text-wrapper']}>
			<span className={styles['icon-wrapper']}>
				<Skeleton width={18} height={18} borderRadius="50%" />
			</span>
			<Skeleton width={305} height={18} borderRadius={4} />
		</li>
	);
};
