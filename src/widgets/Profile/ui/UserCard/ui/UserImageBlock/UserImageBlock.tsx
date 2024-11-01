import { AvatarWithoutPhoto } from '@/shared/ui/AvatarWithoutPhoto';

import { GetProfileResponse } from '@/entities/auth';

import styles from './UserImageBlock.module.css';

interface UserImageBlockProps {
	profile: GetProfileResponse;
}

export const UserImageBlock = ({ profile }: UserImageBlockProps) => {
	return (
		<div className={styles['card-image']}>
			{profile.avatarUrl ? (
				<div className={styles['card-avatar']}>
					<img src={profile.avatarUrl} alt="avatar" />
				</div>
			) : (
				<div className={styles['card-placeholder']}>
					<AvatarWithoutPhoto />
				</div>
			)}
		</div>
	);
};
