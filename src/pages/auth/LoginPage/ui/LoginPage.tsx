import { i18Namespace } from '@/shared/config/i18n';
import { LS_ACCESS_TOKEN_KEY } from '@/shared/constants/authConstants';
import { getFromLS } from '@/shared/helpers/manageLocalStorage';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Button } from '@/shared/ui/Button';

import { useLazyLogoutQuery, useProfileQuery } from '@/entities/auth';

import { LoginCreateForm } from '@/widgets/authentication/login';

import styles from './LoginPage.module.css';

const LoginPage = () => {
	const { data: profile } = useProfileQuery();
	const [trigger] = useLazyLogoutQuery();
	const accessToken = getFromLS(LS_ACCESS_TOKEN_KEY);
	const { t } = useI18nHelpers();
	const { t: tAuth } = useI18nHelpers(i18Namespace.auth);

	const handleLogoutUser = () => {
		trigger();
	};

	const loginTitle = accessToken ? `${t('hello')} ${profile?.firstName}` : tAuth('login.title');

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>{loginTitle}</h1>
			{accessToken ? (
				<Button onClick={handleLogoutUser} size="L">
					{t('buttons.logout')}
				</Button>
			) : (
				<LoginCreateForm />
			)}
		</div>
	);
};

export default LoginPage;
