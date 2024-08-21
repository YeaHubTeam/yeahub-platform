import { UserCreateForm } from '@/widgets/registration';

import styles from './RegistrationPage.module.css';

const RegistrationPage = () => {
	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>Регистрация</h1>
			<UserCreateForm />
		</div>
	);
};

export default RegistrationPage;
