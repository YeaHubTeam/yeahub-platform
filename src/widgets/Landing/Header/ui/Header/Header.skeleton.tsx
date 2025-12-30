import { AppLogoSkeleton } from '@/shared/ui/AppLogo';
import { Flex } from '@/shared/ui/Flex';

import { HeaderAuthSkeleton } from '../HeaderAuth/HeaderAuth.skeleton';
import { HeaderNavSkeleton } from '../HeaderNav/HeaderNav.skeleton';

import styles from './Header.module.css';

export const HeaderSkeleton = () => {
	return (
		<Flex dataTestId="HeaderSkeleton_Wrapper" className={styles.header}>
			<Flex className={styles['header-content']}>
				<Flex className={styles['header-main']}>
					<AppLogoSkeleton />
					<HeaderNavSkeleton />
				</Flex>
				<HeaderAuthSkeleton />
			</Flex>
		</Flex>
	);
};
