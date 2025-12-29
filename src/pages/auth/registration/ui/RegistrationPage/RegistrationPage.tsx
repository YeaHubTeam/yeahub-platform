import { UserCreateForm } from '@/widgets/authentication/registration';

import styles from './RegistrationPage.module.css';

const RegistrationPage = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<UserCreateForm />
			</div>
		</div>
	);
};

export default RegistrationPage;
