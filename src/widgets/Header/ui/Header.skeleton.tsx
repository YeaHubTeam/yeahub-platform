import { isMobile } from 'react-device-detect';

import { Skeleton } from '@/shared/ui/Skeleton';

import { UserPreferencesSkeleton } from '@/features/common/user-preferences';

import styles from './Header.module.css';

export const HeaderSkeleton = () => (
	<header className={styles.header}>
		{isMobile && <Skeleton width={'100px'} height={'38px'} />}

		{/* <ThemeSwitcher /> */}
		<UserPreferencesSkeleton />

		{isMobile && <Skeleton className={styles.burger} width={'32px'} height={'32px'} />}
	</header>
);
