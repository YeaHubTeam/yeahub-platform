/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Logo from '@/shared/assets/icons/logo.svg';
import LogoImg from '@/shared/assets/images/logoImg.png';

import styles from './AppLogo.module.css';

export const AppLogo = () => {
	const isOpenSidebar = useSelector((state: any) => state.navigationSidebar.isOpenSidebar);
	return (
		<NavLink to="/" className={`${styles.logo} ${isOpenSidebar && styles.one}`}>
			<img className={styles['logo-image']} src={LogoImg} alt="LogoImg" />
			<Logo className={`${styles.name} ${isOpenSidebar && styles.closing}`} />
		</NavLink>
	);
};
