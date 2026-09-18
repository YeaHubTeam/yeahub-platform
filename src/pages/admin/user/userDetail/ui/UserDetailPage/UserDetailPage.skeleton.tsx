import { Flex } from '@/shared/ui/Flex';
import { HeaderAdminPageDetailCardSkeleton } from '@/shared/ui/HeaderAdminPageDetailCard';

import { UserCardSkeleton } from '@/entities/user';

import styles from './UserDetailPage.module.css';

export const UserDetailPageSkeleton = () => {
	return (
		<Flex direction="column" gap="24">
			<Flex align="center" justify="between" gap="8" className={styles.actions}>
				<HeaderAdminPageDetailCardSkeleton />
			</Flex>
			<UserCardSkeleton />
		</Flex>
	);
};
