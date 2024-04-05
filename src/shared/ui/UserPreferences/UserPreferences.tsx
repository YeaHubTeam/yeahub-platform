import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import Message from '@/shared/assets/icons/message.svg';
import Notification from '@/shared/assets/icons/notification.svg';
import Settings from '@/shared/assets/icons/settings.svg';
import Avatar from '@/shared/assets/images/MockAvatar.png';

import styles from './UserPreferences.module.css';

export const UserPreferences: FC = () => {
	return (
		<div className={styles.preferences}>
			<div className={styles['btns-group']}>
				<Message className={styles.icon} />
				<Notification className={styles.icon} />
				<Settings className={styles.icon} />
			</div>
			<NavLink to="/" className={styles.avatar}>
				<img className={styles.img} src={Avatar} alt="avatar" />
			</NavLink>
		</div>
	);
};
