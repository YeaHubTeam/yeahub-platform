import { Skeleton } from '@/shared/ui/Skeleton';

import { AuthAsideSkeleton } from '../AuthAside/AuthAside.skeleton';
import { SkeletonGenerator } from '../SkeletonGenerator/SkeletonGenerator';

import styles from './AuthLayout.module.css';

export const AuthLayoutSkeleton = () => {
	return (
		<div data-testid="AuthLayoutSkeleton_Wrapper" className={styles.container}>
			<AuthAsideSkeleton />

			<div className={styles['logo-wrapper']} aria-hidden="true">
				<Skeleton width={120} height={32} borderRadius={8} />
			</div>

			<SkeletonGenerator />
		</div>
	);
};
