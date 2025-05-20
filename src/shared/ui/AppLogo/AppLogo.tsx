import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import logoDark from '@/shared/assets/icons/logoDark.avif';
import logoLight from '@/shared/assets/icons/logoLight.avif';
import LogoText from '@/shared/assets/icons/logoText.svg';
import { ROUTES } from '@/shared/config/router/routes';

import styles from './AppLogo.module.css';

interface AppLogoProps {
	navigateTo?: string;
	logoType?: 'light' | 'dark';
	fill?: 'white' | 'black';
	isOpen?: boolean;
	navigationFooter?: boolean;
}

export const AppLogo = ({
	navigateTo = ROUTES.platformRoute,
	logoType = 'dark',
	fill = 'black',
	isOpen = false,
	navigationFooter = false,
}: AppLogoProps) => {
	const logoSrc = logoType === 'dark' ? logoDark : logoLight;

	return (
		<NavLink
			data-testid="AppLogo_Link"
			to={navigateTo}
			className={classNames(
				styles['home-link'],
				{ [styles.center]: isOpen },
				{ [styles['pointer-event-none']]: navigateTo === '#' },
			)}
		>
			{!navigationFooter && (
				<img
					className={styles.logo}
					src={logoSrc}
					alt="Тренажер собеседований и вопросы собеседований в IT"
					data-testid="AppLogo_Img"
				/>
			)}
			{(!isOpen || navigationFooter) && (
				<LogoText
					className={classNames(
						styles['logo-text'],
						{ [styles['logo-text-header']]: !navigationFooter },
						styles[fill],
					)}
				/>
			)}
		</NavLink>
	);
};
