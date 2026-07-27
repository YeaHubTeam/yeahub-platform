import { AppLogoSkeleton } from '@/shared/ui/AppLogo';

import { AuthAsideSkeleton } from '../AuthAside/AuthAside.skeleton';
import { SkeletonGenerator } from '../SkeletonGenerator/SkeletonGenerator';

import styles from './AuthLayout.module.css';

export const AuthLayoutSkeleton = () => {
	return (
		<div data-testid="AuthLayoutSkeleton_Wrapper" className={styles.container}>
			<AuthAsideSkeleton />
			<div className={styles['logo-wrapper']}>
				<AppLogoSkeleton isOpen={false} />
			</div>
			<SkeletonGenerator />
		</div>
	);
};
