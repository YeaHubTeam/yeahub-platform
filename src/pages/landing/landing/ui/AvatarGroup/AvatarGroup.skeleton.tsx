import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './AvatarGroup.module.css';

export const AvatarGroupSkeleton = () => {
	return (
		<Flex className={styles['avatar-group']}>
			{Array.from({ length: 5 }).map((_, index) => (
				<Skeleton
					borderRadius="50%"
					key={index}
					style={{ border: 'none' }}
					className={styles.avatar}
				/>
			))}
		</Flex>
	);
};
