import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { IconSkeleton } from '@/shared/ui/Icon';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

import { SocialNetWorkListSkeleton } from '@/entities/socialNetwork';
import { UserRolesListSkeleton } from '@/entities/user';

import styles from './UserInfoBlock.module.css';

export const UserInfoBlockSkeleton = () => {
	const { isMobileS } = useScreenSize();

	return (
		<div className={styles['card-info']}>
			<div className={styles['card-header']}>
				<Flex
					gap={isMobileS ? '8' : '16'}
					direction={isMobileS ? 'column-reverse' : 'row'}
					justify="between"
					maxWidth
				>
					<TextSkeleton variant="body6" width={200} />
					<UserRolesListSkeleton />
				</Flex>
				<TextSkeleton variant="body3-accent" width={200} />
			</div>
			<TextSkeleton variant="body3-accent" width={200} />
			<ul className={styles['card-list']}>
				<li className={styles['card-address']}>
					<Skeleton width={100} />
				</li>
			</ul>
			<div className={styles['card-contacts']}>
				<Flex align="center" gap="4">
					<IconSkeleton />
					<TextSkeleton variant="body2" width={200} />
				</Flex>
				<SocialNetWorkListSkeleton />
			</div>
		</div>
	);
};
