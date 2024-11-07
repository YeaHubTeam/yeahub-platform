import Checkmark from '@/shared/assets/icons/Checkmark.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import styles from './UserVerifyed.module.css';

export const UserVerifyed = () => {
	const { t } = useI18nHelpers(i18Namespace.profile);

	return (
		<>
			<div className={styles.wrapper}>
				<Checkmark className={styles.svg} />
				<h3 className={styles['card-title']}>
					{t(Profile.PROFILE_EMAIL_VERIFICATION_VERIFY_SUCCESS)}
				</h3>
			</div>
			<p className={styles['card-text']}>{t(Profile.PROFILE_EMAIL_VERIFICATION_VERIFY_TEXT)}</p>
		</>
	);
};
