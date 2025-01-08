import { AppLogoSkeleton } from '@/shared/ui/AppLogo/AppLogo.skeleton';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './Sidebar.module.css';

export const SidebarSkeleton = () => {
	return (
		<aside className={styles.sidebar}>
			<div className={styles.header}>
				<AppLogoSkeleton />
				<button className={styles['close-icon']}>
					<Skeleton className={styles.arrow} width={'25px'} height={'25px'} borderRadius={'50%'} />
				</button>
			</div>

			<div className={styles.menu}>
				<Flex gap={'8'} direction={'column'}>
					{[...Array(4)].map((_, i) => (
						<Skeleton key={i} width="100%" height={44} />
					))}
				</Flex>
			</div>

			<Flex gap={'8'} direction={'column'} className={styles['bottom-actions-skeleton']}>
				{[...Array(2)].map((_, i) => (
					<Skeleton key={i} width="100%" height={44} />
				))}
			</Flex>
		</aside>
	);
};
