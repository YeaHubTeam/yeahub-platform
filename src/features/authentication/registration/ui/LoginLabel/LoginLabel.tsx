import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Auth } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { Button } from '@/shared/ui/Button';

import styles from './LoginLabel.module.css';

export const LoginLabel = () => {
	const navigate = useNavigate();
	const { t } = useTranslation(i18Namespace.auth);
	const handleClickNavigation = () => {
		navigate(ROUTES.auth.login.page);
	};
	return (
		<div className={styles.wrapper}>
			<p>{t(Auth.REGISTRATION_HAVE_ACCOUNT)}</p>
			<Button className={styles.btn} variant="link" onClick={handleClickNavigation}>
				{t(Auth.REGISTRATION_LOGIN_LINK)}
			</Button>
		</div>
	);
};
