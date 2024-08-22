import { Button } from 'yeahub-ui-kit';

import { manageLocalStorage } from '@/shared/helpers/manageLocalStorage';

import { useLazyLogoutQuery, useProfileQuery } from '@/entities/auth';

import { LoginCreateForm } from '@/widgets/authentication/login';

import styles from './LoginPage.module.css';

const { getStoredItem } = manageLocalStorage('accessToken');

const LoginPage = () => {
	const { data: profile } = useProfileQuery();
	const accessToken = getStoredItem();
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
