import { Button } from 'yeahub-ui-kit';

import { useAppSelector } from '@/shared/hooks/useAppSelector';

import { useLazyLogoutQuery } from '@/entities/auth';

import { LoginCreateForm } from '@/widgets/authentication/login';
import { AuthLayout } from '@/widgets/AuthLayout';

import styles from './LoginPage.module.css';

const LoginPage = () => {
	const { accessToken, profile } = useAppSelector((state) => state.auth);
	const [trigger] = useLazyLogoutQuery();

	const handleLogoutUser = () => {
		trigger();
	};

	const loginTitle = accessToken ? `Привет, ${profile?.firstName}` : 'Вход в личный кабинет';

	return (
		<AuthLayout>
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
		</AuthLayout>
	);
};

export default LoginPage;
