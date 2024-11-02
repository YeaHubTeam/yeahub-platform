import { Link } from 'react-router-dom';
import { Button } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import styles from './UnauthorizedBlock.module.css';

export const UnauthorizedBlock = () => {
	const { t } = useI18nHelpers(i18Namespace.landing);

	return (
		<nav className={styles.navigation}>
			<Link to={ROUTES.auth.login.page}>
				<Button theme="tertiary" className={styles['login-button']}>
					{t(Landing.LOGIN)}
				</Button>
			</Link>
			<Link to={ROUTES.auth.register.page}>
				<Button className={styles['register-button']}>{t(Landing.REGISTER)}</Button>
			</Link>
		</nav>
	);
};
