import { Button } from 'yeahub-ui-kit';

import { useLazyLogoutQuery, useProfileQuery } from '@/entities/auth';

import { LoginCreateForm } from '@/widgets/authentication/login';

import styles from './LoginPage.module.css';

const LoginPage = () => {
	const { data: profile } = useProfileQuery();
	const accessToken = localStorage.getItem('accessToken');
	const [trigger] = useLazyLogoutQuery();

	const handleLogoutUser = () => {
		trigger();
	};

	const loginTitle = accessToken ? `Привет, ${profile?.firstName}` : 'Вход в личный кабинет';

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>{loginTitle}</h1>
			{accessToken ? (
				<Button onClick={handleLogoutUser} size="large">
					Выйти из профиля
				</Button>
			) : (
				<LoginCreateForm />
			)}
		</div>
	);
};

export default LoginPage;
