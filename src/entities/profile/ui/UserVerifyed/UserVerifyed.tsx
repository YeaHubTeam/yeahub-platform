import { useTranslation } from 'react-i18next';

import Checkmark from '@/shared/assets/icons/Checkmark.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';

import styles from './UserVerifyed.module.css';

export const UserVerifyed = () => {
	const { t } = useTranslation(i18Namespace.profile);

	return (
		<>
			<div className={styles.wrapper}>
				<Checkmark className={styles.svg} />
				<h3 className={styles['card-title']}>
					{t(Profile.EMAIL_VERIFICATION_SUCCESS_VERIFY_STUB_TITLE)}
				</h3>
			</div>
			<p className={styles['card-text']}>
				{t(Profile.EMAIL_VERIFICATION_SUCCESS_VERIFY_STUB_DESCRIPTION)}
			</p>
		</>
	);
};
