import { Skeleton } from '@/shared/ui/Skeleton';

import { BenefitsListSkeleton } from '../BenefitsList/BenefitsList.skeleton';

import styles from './AuthAside.module.css';

export const AuthAsideSkeleton = () => {
	return (
		<aside className={styles.wrapper}>
			<div className={styles['content-wrapper']}>
				<div className={styles.logo}>
					<div className={styles['logo-wrapper']}>
						<Skeleton width={140} height={35} borderRadius={8} />
					</div>
					<Skeleton width={280} height={20} borderRadius={4} />
				</div>
				<BenefitsListSkeleton />
			</div>
		</aside>
	);
};
