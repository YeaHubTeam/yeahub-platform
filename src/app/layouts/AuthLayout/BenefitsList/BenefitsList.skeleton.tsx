import { Skeleton } from '@/shared/ui/Skeleton';

import { BenefitItemSkeleton } from '../BenefitItem/BenefitItem.skeleton';

import styles from './BenefitsList.module.css';

const BENEFITS_COUNT = 5;

export const BenefitsListSkeleton = () => {
	return (
		<div className={styles['benefit-list-wrapper']}>
			<Skeleton width={305} height={45} borderRadius={8} className={styles.title} />
			<ul className={styles['benefit-wrapper']}>
				{Array.from({ length: BENEFITS_COUNT }, (_, i) => (
					<BenefitItemSkeleton key={`benefit-skeleton-${i}`} />
				))}
			</ul>
		</div>
	);
};
