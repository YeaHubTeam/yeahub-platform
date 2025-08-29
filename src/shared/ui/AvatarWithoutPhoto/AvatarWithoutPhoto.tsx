import WithoutPhotoIcon from '@/shared/assets/icons/withoutPhotoIcon.svg';

import styles from './AvatarWithoutPhoto.module.css';

export const AvatarWithoutPhoto = () => {
	return (
		<div data-testid="AvatarWithoutPhoto_Wrapper" className={styles['avatar-wrapper']}>
			<WithoutPhotoIcon
				role="img"
				aria-label="Аватар пользователя"
				focusable="false"
				className={styles['avatar-icon']}
			/>
		</div>
	);
};
