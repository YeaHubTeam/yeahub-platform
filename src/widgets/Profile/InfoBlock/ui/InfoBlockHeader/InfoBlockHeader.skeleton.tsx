import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import { UserEditButtonSkeleton } from '@/entities/user';

import styles from './InfoBlockHeader.module.css';

export const InfoBlockHeaderSkeleton = () => {
	return (
		<div className={styles['header-card-skeleton']}>
			<Flex gap="16" justify="between">
				<Skeleton width={81} height={27} />
				<UserEditButtonSkeleton />
			</Flex>
		</div>
	);
};
