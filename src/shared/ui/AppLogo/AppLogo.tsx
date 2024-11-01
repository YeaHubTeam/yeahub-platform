import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import Logo from '@/shared/assets/icons/logo.svg';
import LogoImg from '@/shared/assets/images/logoImg.png';
import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import styles from './AppLogo.module.css';

interface AppLogoProps {
	isOpen: boolean;
	fill?: 'white' | 'black';
}

export const AppLogo = ({ isOpen, fill = 'black' }: AppLogoProps) => {
	const { t } = useI18nHelpers(i18Namespace.translation);
	return (
		<NavLink
			to={ROUTES.appRoute}
			className={classNames(styles['home-link'], { [styles.center]: isOpen })}
		>
			<img src={LogoImg} alt={`${t(Translation.LOGO)} Yeahub`} width={'30px'} height={'30px'} />
			<Logo className={classNames(styles.name, styles[fill], { [styles.close]: isOpen })} />
		</NavLink>
	);
};
