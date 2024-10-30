import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import Logo from '@/shared/assets/icons/logo.svg';
import LogoImg from '@/shared/assets/images/logoImg.png';
import { ROUTES } from '@/shared/config/router/routes';

import styles from './AppLogo.module.css';

interface AppLogoProps {
	isOpen: boolean;
	fill?: 'white' | 'black';
	isLanding?: boolean;
}

export const AppLogo = ({ isOpen, fill = 'black', isLanding }: AppLogoProps) => {
	if (!isLanding)
		return (
			<NavLink
				to={ROUTES.platformRoute}
				className={classNames(styles['home-link'], { [styles.center]: isOpen })}
			>
				<img src={LogoImg} alt="Yeahub logo" width={'30px'} height={'30px'} />
				<Logo className={classNames(styles.name, styles[fill], { [styles.close]: isOpen })} />
			</NavLink>
		);

	return (
		<NavLink to="/" className={styles.logo}>
			<Logo className={classNames(styles['landing-name'], {}, [styles[fill]])} />
		</NavLink>
	);
};
