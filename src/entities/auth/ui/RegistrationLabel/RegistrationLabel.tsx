import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Auth } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Button } from '@/shared/ui/Button';

import styles from './RegistrationLabel.module.css';

export const RegistrationLabel = () => {
	const navigate = useNavigate();
	const { t } = useI18nHelpers(i18Namespace.auth);

	const handleClickNavigation = () => {
		navigate(ROUTES.auth.register.page);
	};

	return (
		<div className={styles.wrapper}>
			<p>{t(Auth.LOGIN_NO_ACCOUNT)}</p>
			<Button className={styles.btn} variant="link" onClick={handleClickNavigation}>
				{t(Auth.LOGIN_REGISTER)}
			</Button>
		</div>
	);
};
