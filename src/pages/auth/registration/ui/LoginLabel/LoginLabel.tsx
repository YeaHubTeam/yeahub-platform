import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, Auth, ROUTES } from '@/shared/config';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';

import styles from './LoginLabel.module.css';

export const LoginLabel = () => {
	const navigate = useNavigate();
	const { t } = useTranslation(i18Namespace.auth);
	const handleClickNavigation = () => {
		navigate(ROUTES.auth.login.page);
	};
	return (
		<div className={styles.wrapper}>
			<Text variant="body2">{t(Auth.REGISTRATION_HAVE_ACCOUNT)}</Text>
			<Button className={styles.btn} variant="link" onClick={handleClickNavigation}>
				{t(Auth.REGISTRATION_LOGIN_LINK)}
			</Button>
		</div>
	);
};
