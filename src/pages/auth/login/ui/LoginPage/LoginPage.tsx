import { useTranslation } from 'react-i18next';

import { i18Namespace, Auth } from '@/shared/config';
import { useAppSelector, LS_ACCESS_TOKEN_KEY, getFromLS } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';

import { useLazyLogoutQuery } from '@/entities/auth';
import { getFullProfile } from '@/entities/profile';

import { LoginCreateForm } from '../LoginCreateForm/LoginCreateForm';

import styles from './LoginPage.module.css';

const LoginPage = () => {
	const profile = useAppSelector(getFullProfile);
	const [trigger] = useLazyLogoutQuery();
	const accessToken = getFromLS(LS_ACCESS_TOKEN_KEY);
	const { t } = useTranslation(i18Namespace.auth);

	const handleLogoutUser = () => {
		trigger();
	};

	const loginTitle = accessToken
		? `${t(Auth.LOGIN_HELLO)} ${profile?.username}`
		: t(Auth.LOGIN_TITLE);

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>{loginTitle}</h1>
			{accessToken ? (
				<Button onClick={handleLogoutUser} size="large">
					{t(Auth.LOGOUT)}
				</Button>
			) : (
				<LoginCreateForm />
			)}
		</div>
	);
};

export default LoginPage;
