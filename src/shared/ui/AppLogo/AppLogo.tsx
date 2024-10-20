import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import Logo from '@/shared/assets/icons/logo.svg';
import LogoImg from '@/shared/assets/images/logoImg.png';
import { ROUTES } from '@/shared/config/router/routes';

import styles from './AppLogo.module.css';

interface AppLogoProps {
	isOpen: boolean;
	fill?: 'white' | 'black';
}

export const AppLogo = ({ isOpen, fill = 'black' }: AppLogoProps) => (
	<NavLink
		to={ROUTES.appRoute}
		className={classNames(styles['home-link'], { [styles.center]: isOpen })}
	>
		<img src={LogoImg} alt="Yeahub logo" width={'30px'} height={'30px'} />
		<Logo className={classNames(styles.name, styles[fill], { [styles.close]: isOpen })} />
	</NavLink>
);
