import { useNavigate } from 'react-router-dom';
import { Button } from 'yeahub-ui-kit';

import { ROUTES } from '@/shared/config/router/routes';

import styles from './RegistrationLabel.module.css';

export const RegistrationLabel = () => {
	const navigate = useNavigate();
	const handleClickNavigation = () => {
		navigate(ROUTES.auth.register.page);
	};
	return (
		<div className={styles.wrapper}>
			<p>Нет аккаунта?</p>
			<Button className={styles.btn} tagName="a" theme="link" onClick={handleClickNavigation}>
				Зарегистрироваться
			</Button>
		</div>
	);
};
