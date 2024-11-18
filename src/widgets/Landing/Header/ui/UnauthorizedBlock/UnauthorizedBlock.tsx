import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { BurgerMenu } from '@/shared/ui/BurgerMenu';
import { Button } from '@/shared/ui/Button';

import styles from './UnauthorizedBlock.module.css';

export const UnauthorizedBlock = () => {
	const { t } = useI18nHelpers(i18Namespace.landing);
	const { isMobile } = useScreenSize();
	const navigate = useNavigate();

	const menuItems = [
		{
			id: '1',
			label: 'Вход',
			onClick: () => navigate(ROUTES.auth.login.page),
		},
		{
			id: '2',
			label: 'Регистрация',
			onClick: () => navigate(ROUTES.auth.register.page),
		},
	];

	if (isMobile) return <BurgerMenu menuItems={menuItems} />;

	return (
		<nav className={styles.navigation}>
			<Link className={styles.login} to={ROUTES.auth.login.page}>
				{t(Landing.LOGIN)}
			</Link>
			<Link to={ROUTES.auth.register.page}>
				<Button className={styles['register-button']}>{t(Landing.REGISTER)}</Button>
			</Link>
		</nav>
	);
};
