import withoutPhoto from '@/shared/assets/images/Photo_Profile.png';

import styles from './AvatarWithoutPhoto.module.css';

export const AvatarWithoutPhoto = () => {
	return (
		<div className={styles['avatar-wrapper']}>
			<img src={withoutPhoto} alt="Avatar" />
		</div>
	);
};
