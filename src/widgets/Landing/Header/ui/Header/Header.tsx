import { ROUTES } from '@/shared/config/router/routes';
import { AppLogo } from '@/shared/ui/AppLogo';
import { Flex } from '@/shared/ui/Flex';

import { useProfileQuery } from '@/entities/auth';

import { HeaderAuth } from '../HeaderAuth/HeaderAuth';
import { HeaderNav } from '../HeaderNav/HeaderNav';

import styles from './Header.module.css';
import { HeaderSkeleton } from './Header.skeleton';

export const Header = () => {
	const { isLoading } = useProfileQuery();

	if (isLoading) return <HeaderSkeleton />;

	return (
		<header data-testid={'Header'} className={styles.header}>
			<Flex className={styles['header-content']}>
				<Flex className={styles['header-main']}>
					<AppLogo navigateTo={ROUTES.appRoute} />
					<HeaderNav />
				</Flex>
				<HeaderAuth />
			</Flex>
		</header>
	);
};
