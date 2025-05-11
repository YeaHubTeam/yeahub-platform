import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './HeaderAuthDesktop.module.css';

export const HeaderAuthDesktopSkeleton = () => {
	return (
		<Flex justify="between" align="center" gap="26">
			<Skeleton className={styles['login-link']} width={40} height={20} borderRadius={4} />
			<Skeleton className={styles['register-button']} width={171} height={48} borderRadius={12} />
		</Flex>
	);
};
