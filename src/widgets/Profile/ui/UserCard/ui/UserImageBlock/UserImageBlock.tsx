import { AvatarWithoutPhoto } from '@/shared/ui/AvatarWithoutPhoto';

import { User } from '@/entities/profile';

import styles from './UserImageBlock.module.css';

interface UserImageBlockProps {
	user: User;
}

export const UserImageBlock = ({ user }: UserImageBlockProps) => {
	return (
		<div className={styles['card-image']}>
			{user.avatarUrl ? (
				<div className={styles['card-avatar']}>
					<img src={user.avatarUrl} alt="avatar" />
				</div>
			) : (
				<AvatarWithoutPhoto />
			)}
		</div>
	);
};
