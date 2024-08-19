import { AuthLayout } from '@/widgets/AuthLayout';
import { UserCreateForm } from '@/widgets/registration';

import styles from './RegistrationPage.module.css';

const RegistrationPage = () => {
	return (
		<AuthLayout>
			<div className={styles.wrapper}>
				<h1 className={styles.title}>Регистрация</h1>
				<UserCreateForm />
			</div>
		</AuthLayout>
	);
};

export default RegistrationPage;
