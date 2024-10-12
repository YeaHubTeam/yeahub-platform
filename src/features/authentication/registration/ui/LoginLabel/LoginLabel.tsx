import { useNavigate } from 'react-router-dom';
import { Button } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Auth } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import styles from './LoginLabel.module.css';

export const LoginLabel = () => {
	const navigate = useNavigate();
	const { t } = useI18nHelpers(i18Namespace.auth);
	const handleClickNavigation = () => {
		navigate(ROUTES.auth.login.page);
	};
	return (
		<div className={styles.wrapper}>
			<p>{t(Auth.REGISTRATION_HAVE_ACCOUNT)}</p>
			<Button className={styles.btn} tagName="a" theme="link" onClick={handleClickNavigation}>
				{t(Auth.REGISTRATION_LOGIN)}
			</Button>
		</div>
	);
};