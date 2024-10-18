import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import Logo from '@/shared/assets/icons/logo.svg';
import { ROUTES } from '@/shared/config/router/routes';

import styles from './AppLogo.module.css';

interface AppLogoProps {
	isOpen: boolean;
	fill?: 'white' | 'black';
}

export const AppLogo = ({ isOpen, fill = 'black' }: AppLogoProps) => {
	return (
		<NavLink
			to={ROUTES.appRoute}
			className={classNames(styles['home-link'], { [styles.center]: isOpen })}
		>
			<Logo
				className={classNames(styles.name, styles[fill], {
					[styles.short]: isOpen,
				})}
				preserveAspectRatio="xMinYMin"
			/>
		</NavLink>
	);
};
