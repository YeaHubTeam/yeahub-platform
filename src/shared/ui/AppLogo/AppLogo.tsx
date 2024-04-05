import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import Logo from '@/shared/assets/icons/logo.svg';

import styles from './AppLogo.module.css';

export const AppLogo: FC = () => {
	return (
		<NavLink to="/" className={styles.logo}>
			<Logo className={styles.name} />
		</NavLink>
	);
};
