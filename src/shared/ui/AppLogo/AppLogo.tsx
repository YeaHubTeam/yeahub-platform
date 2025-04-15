import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import logoDark from '@/shared/assets/icons/logoDark.avif';
import logoLight from '@/shared/assets/icons/logoLight.avif';
import LogoText from '@/shared/assets/icons/logoText.svg';
import { ROUTES } from '@/shared/config/router/routes';

import styles from './AppLogo.module.css';

interface AppLogoProps {
	isOpen: boolean;
	fill?: 'white' | 'black';
	navigateTo?: string;
	logoType?: 'light' | 'dark';
	navigationFooter?: boolean;
}

export const AppLogo = ({
	isOpen,
	fill = 'black',
	navigateTo = ROUTES.platformRoute,
	logoType = 'dark',
	navigationFooter = false,
}: AppLogoProps) => {
	const logoSrc = logoType === 'dark' ? logoDark : logoLight;

	return (
		<NavLink
			to={navigateTo}
			className={classNames(
				styles['home-link'],
				{ [styles.center]: isOpen },
				{ [styles['pointer-event-none']]: navigateTo === '#' },
			)}
		>
			{navigationFooter ? (
				''
			) : (
				<img
					className={styles.logo}
					src={logoSrc}
					alt="Тренажер собеседований и вопросы собеседований в IT"
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
