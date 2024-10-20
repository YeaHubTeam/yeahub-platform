import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import { UserCreateForm } from '@/widgets/registration';

import styles from './RegistrationPage.module.css';

const RegistrationPage = () => {
	const { t } = useI18nHelpers('auth');

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>{t('registration.title')}</h1>
			<UserCreateForm />
		</div>
	);
};

export default RegistrationPage;
