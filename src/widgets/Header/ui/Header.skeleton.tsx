import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Skeleton } from '@/shared/ui/Skeleton';

import { UserPreferencesSkeleton } from '@/features/common/user-preferences';

import styles from './Header.module.css';

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
