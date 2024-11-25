import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import logo from '@/shared/assets/icons/logo.png';
import LogoText from '@/shared/assets/icons/logoText.svg';
import { ROUTES } from '@/shared/config/router/routes';

import styles from './AppLogo.module.css';

interface AppLogoProps {
	isOpen: boolean;
	fill?: 'white' | 'black';
	navigateTo?: string;
}

export const AppLogo = ({
	isOpen,
	fill = 'black',
	navigateTo = ROUTES.platformRoute,
}: AppLogoProps) => {
	return (
		<NavLink
			to={navigateTo}
			className={classNames(
				styles['home-link'],
				{ [styles.center]: isOpen },
				{ [styles['pointer-event-none']]: navigateTo === '#' },
			)}
		>
			<img className={styles.logo} src={logo} alt="" />
			{!isOpen && <LogoText className={classNames(styles['logo-text'], styles[fill])} />}
		</NavLink>
	);
};
