import { useNavigate } from 'react-router-dom';
import { Button } from 'yeahub-ui-kit';

import styles from './LoginLabel.module.css';

export const LoginLabel = () => {
	const navigate = useNavigate();
	const handleClickNavigation = () => {
		navigate('/auth/login');
	};
	return (
		<div className={styles.wrapper}>
			<p>Уже есть аккаунт?</p>
			<Button className={styles.btn} tagName="a" theme="link" onClick={handleClickNavigation}>
				Войти
			</Button>
		</div>
	);
};
