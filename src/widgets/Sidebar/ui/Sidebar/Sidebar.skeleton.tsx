import { AppLogoSkeleton } from '@/shared/ui/AppLogo/AppLogo.skeleton';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './Sidebar.module.css';

export const SidebarSkeleton = () => (
	<aside className={styles.sidebar}>
		<div className={styles.header}>
			<AppLogoSkeleton />
			<button className={styles['close-icon']}>
				<Skeleton className={styles.arrow} width={'25px'} height={'25px'} borderRadius={'50%'} />
			</button>
		</div>

		<div className={styles.menu}>
			<Flex gap={'8'} direction={'column'}>
				{[...Array(3)].map((_, i) => (
					<Skeleton key={i} width={'100%'} height={'44px'} />
				))}
			</Flex>
		</div>
	</aside>
);
