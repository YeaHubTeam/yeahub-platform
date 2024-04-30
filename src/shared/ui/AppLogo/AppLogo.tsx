import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import Logo from '@/shared/assets/icons/logo.svg';
import LogoImg from '@/shared/assets/images/logoImg.png';
import { useAppSelector } from '@/shared/hooks/useAppSelector';

import styles from './AppLogo.module.css';

export const AppLogo: FC = () => {
	const isOpenSidebar = useAppSelector((state) => state.navSidebar.isOpenSidebar);
	return (
		<NavLink to="/" className={`${styles.logo} ${isOpenSidebar ? styles['one'] : ''}`}>
			<img className={`${styles['logo-image']}`} src={LogoImg} alt="LogoImg" />
			<Logo className={`${styles.name} ${isOpenSidebar ? styles['closing'] : ''}`} />
		</NavLink>
	);
};
