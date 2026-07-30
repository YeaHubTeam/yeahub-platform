import { BackButtonSkeleton } from '@/shared/ui/BackButton';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { UserCardSkeleton } from '@/entities/user';

import styles from './UserDetailPage.module.css';

export const UserDetailPageSkeleton = () => {
	return (
		<Flex direction="column" gap="24">
			<Flex align="center" justify="between" gap="8" className={styles.actions}>
				<BackButtonSkeleton />
				<Flex gap="16">
					<ButtonSkeleton width={120} />
					<ButtonSkeleton width={180} />
				</Flex>
			</Flex>
			<UserCardSkeleton />
		</Flex>
	);
};
