import { useNavigate } from 'react-router-dom';
import { Button } from 'yeahub-ui-kit';

import styles from './RegistrationLabel.module.css';

export const RegistrationLabel = () => {
	const navigate = useNavigate();
	const handleClickNavigation = () => {
		navigate('/registration');
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
