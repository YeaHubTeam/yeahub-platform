import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import Avatar from '@/shared/assets/images/MockAvatar.png';

import { SettingsButton } from '../SettingsButton';

import styles from './UserPreferences.module.css';

export const UserPreferences: FC = () => {
	return (
		<div className={styles.preferences}>
			<div className={styles.sittings}>
				<SettingsButton />
			</div>
			<NavLink to="/" className={styles.avatar}>
				<img className={styles.img} src={Avatar} alt="avatar" />
			</NavLink>
		</div>
	);
};
