import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, Auth, ROUTES } from '@/shared/config';
import { Button } from '@/shared/ui/Button';

import styles from './RegistrationLabel.module.css';

export const RegistrationLabel = () => {
	const navigate = useNavigate();
	const { t } = useTranslation(i18Namespace.auth);

	const handleClickNavigation = () => {
		navigate(ROUTES.auth.register.page);
	};

	return (
		<div className={styles.wrapper}>
			<p>{t(Auth.LOGIN_NO_ACCOUNT)}</p>
			<Button className={styles.btn} variant="link" onClick={handleClickNavigation}>
				{t(Auth.LOGIN_REGISTER_LINK)}
			</Button>
		</div>
	);
};
