import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Auth } from '@/shared/config/i18n/i18nTranslations';
import { LS_ACCESS_TOKEN_KEY } from '@/shared/constants/authConstants';
import { getFromLS } from '@/shared/helpers/manageLocalStorage';
import { useAppSelector } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';

import { useLazyLogoutQuery } from '@/entities/auth';
import { getFullProfile } from '@/entities/profile';

import { LoginCreateForm } from '@/widgets/authentication/login';

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
