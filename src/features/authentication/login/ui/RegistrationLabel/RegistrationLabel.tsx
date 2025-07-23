import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Auth } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';

import styles from './RegistrationLabel.module.css';

export const RegistrationLabel = () => {
	const navigate = useNavigate();
	const { t } = useTranslation(i18Namespace.auth);

	const handleClickNavigation = () => {
		navigate(ROUTES.auth.register.page);
	};

	return (
		<div className={styles.wrapper}>
			<Text variant="body2">{t(Auth.LOGIN_NO_ACCOUNT)}</Text>
			<Button className={styles.btn} variant="link" onClick={handleClickNavigation}>
				{t(Auth.LOGIN_REGISTER_LINK)}
			</Button>
		</div>
	);
};
