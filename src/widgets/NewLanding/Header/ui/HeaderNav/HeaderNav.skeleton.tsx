import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './HeaderNav.module.css';

export const HeaderNavSkeleton = () => {
	const { isLargeScreen } = useScreenSize();

	return (
		<Flex>
			{isLargeScreen ? (
				<Flex className={styles['header-nav']}>
					<Skeleton width={120} height={20} borderRadius={4} />
					<Skeleton width={90} height={20} borderRadius={4} />
				</Flex>
			) : (
				<Skeleton className={styles.button} width={116} height={20} borderRadius={4} />
			)}
		</Flex>
	);
};
