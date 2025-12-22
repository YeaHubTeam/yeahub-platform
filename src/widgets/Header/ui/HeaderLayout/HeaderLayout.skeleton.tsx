import { useScreenSize } from '@/shared/libs';
import { Skeleton } from '@/shared/ui/Skeleton';

import { UserPreferencesSkeleton } from '../UserPreferences/UserPreferences.skeleton';

import styles from './HeaderLayout.module.css';

export const HeaderSkeleton = () => {
	const { isMobile, isTablet } = useScreenSize();

	return (
		<header className={styles.header}>
			{/* <ThemeSwitcher /> */}
			{isMobile || isTablet ? (
				<>
					<Skeleton width={45} height={45} borderRadius={50} />
					<Skeleton width={32} height={32} borderRadius={12} />
				</>
			) : (
				<UserPreferencesSkeleton />
			)}
		</header>
	);
};
