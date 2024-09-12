import { User } from '@/entities/profile';

import styles from './UserImageBlock.module.css';

interface UserImageBlockProps {
	user: User;
}

export const UserImageBlock = ({ user }: UserImageBlockProps) => {
	return (
		<div className={styles['card-image']}>
			<div className={styles['card-avatar']}>
				<img src={user?.avatarUrl} alt="avatar" />
			</div>
		</div>
	);
};
