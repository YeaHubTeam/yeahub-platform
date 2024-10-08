import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Skeleton } from '@/shared/ui/Skeleton';

import { UserPreferencesSkeleton } from '@/features/common/user-preferences';

import styles from './Header.module.css';

export const HeaderSkeleton = () => {
	const { isMobile } = useScreenSize();

	return (
		<header className={styles.header}>
			{isMobile && <Skeleton width={'100px'} height={'38px'} />}

			{/* <ThemeSwitcher /> */}
			<UserPreferencesSkeleton />

			{isMobile && <Skeleton className={styles.burger} width={'32px'} height={'32px'} />}
		</header>
	);
};
