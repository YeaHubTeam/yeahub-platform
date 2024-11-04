/* eslint-disable import/no-internal-modules */
import AvatarPlaceholder from '../../assets/images/landing/avatar-placeholder.jpg';

import styles from './AuthAvatarFrame.module.css';

interface AvatarProps {
	link: string | null;
}

export const AuthAvatarFrame = ({ link }: AvatarProps) => {
	return (
		<div className={styles.wrapper}>
			<img src={link || AvatarPlaceholder} className={styles.avatar} alt="User Avatar" />
		</div>
	);
};
