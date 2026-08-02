import { BackHeaderSkeleton } from '@/shared/ui/BackHeader';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { DeleteButtonSkeleton } from '@/shared/ui/DeleteButton';
import { Flex } from '@/shared/ui/Flex';

import { UserCardSkeleton } from '@/entities/user';

import styles from './UserDetailPage.module.css';

export const UserDetailPageSkeleton = () => {
	return (
		<Flex direction="column" gap="24">
			<Flex align="center" justify="between" gap="8" className={styles.actions}>
				<BackHeaderSkeleton>
					<DeleteButtonSkeleton isDetailPage />
					<ButtonSkeleton width={180} />
				</BackHeaderSkeleton>
			</Flex>
			<UserCardSkeleton />
		</Flex>
	);
};
