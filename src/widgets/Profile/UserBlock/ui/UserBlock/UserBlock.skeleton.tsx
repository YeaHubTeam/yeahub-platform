import { Card } from '@/shared/ui/Card';

import { UserEditButtonSkeleton } from '@/entities/user';

import { UserImageBlockSkeleton } from '../UserImageBlock';
import { UserInfoBlockSkeleton } from '../UserInfoBlock';

import styles from './UserBlock.module.css';

export const UserBlockSkeleton = () => {
	return (
		<Card className={styles['profile-card-skeleton']}>
			<div className={styles['flex-profile-skeleton']}>
				<UserImageBlockSkeleton />
				<UserInfoBlockSkeleton />
				<UserEditButtonSkeleton />
			</div>
		</Card>
	);
};
