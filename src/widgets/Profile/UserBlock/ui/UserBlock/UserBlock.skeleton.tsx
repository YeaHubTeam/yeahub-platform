import { CardSkeleton } from '@/shared/ui/Card';

import { UserEditButtonSkeleton } from '@/entities/user';

import { UserImageBlockSkeleton } from '../UserImageBlock';
import { UserInfoBlockSkeleton } from '../UserInfoBlock';

import styles from './UserBlock.module.css';

export const UserBlockSkeleton = ({ isEdit }: { isEdit?: boolean }) => {
	return (
		<CardSkeleton withOutsideShadow>
			<div className={styles.card}>
				<div className={styles['user-data']}>
					<UserImageBlockSkeleton />
					<UserInfoBlockSkeleton />
				</div>
				{isEdit && <UserEditButtonSkeleton />}
			</div>
		</CardSkeleton>
	);
};
