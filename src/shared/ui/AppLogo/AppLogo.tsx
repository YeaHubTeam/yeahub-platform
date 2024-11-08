import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import Logo from '@/shared/assets/icons/logo.svg';
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
			<Logo
				className={classNames(styles.name, styles[fill], {
					[styles.short]: isOpen,
				})}
				preserveAspectRatio="xMinYMin"
			/>
		</NavLink>
	);
};
