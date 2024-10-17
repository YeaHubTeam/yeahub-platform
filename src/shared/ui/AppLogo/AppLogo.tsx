import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import Logo from '@/shared/assets/icons/logo.svg';
import { ROUTES } from '@/shared/config/router/routes';
import { PROJECTNAME } from '@/shared/constants/projectName';

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
		{!isOpen ? (
			<Logo className={classNames(styles.name, styles[fill], { [styles.close]: isOpen })} />
		) : (
			<span className={styles['logo-symbol']}>{PROJECTNAME[0]}</span>
		)}
	</NavLink>
);
