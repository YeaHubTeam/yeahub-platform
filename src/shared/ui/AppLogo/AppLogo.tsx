import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import Logo from '@/shared/assets/icons/logo.svg';
import LogoImg from '@/shared/assets/images/logoImg.png';

import styles from './AppLogo.module.css';

interface AppLogoProps {
	isOpen: boolean;
	fill?: 'white' | 'black';
}

export const AppLogo = ({ isOpen, fill = 'black' }: AppLogoProps) => {
	return (
		<NavLink to="/" className={`${styles.logo} ${isOpen ? styles['one'] : ''}`}>
			<img className={`${styles['logo-image']}`} src={LogoImg} alt="LogoImg" />
			<Logo className={classNames(styles.name, styles[fill], { [styles['closing']]: isOpen })} />
		</NavLink>
	);
};
