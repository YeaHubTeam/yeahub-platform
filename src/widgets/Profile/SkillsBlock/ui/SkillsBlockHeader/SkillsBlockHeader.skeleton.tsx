import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import { UserEditButtonSkeleton } from '@/entities/user';

import styles from './SkillsBlockHeader.module.css';

export const SkillsBlockHeaderSkeleton = () => {
	return (
		<div className={styles['header-card-skeleton']}>
			<Flex gap="16" justify="between">
				<Skeleton width={81} height={27} />
				<UserEditButtonSkeleton />
			</Flex>
		</div>
	);
};
