import { useTranslation } from 'react-i18next';

import Checkmark from '@/shared/assets/icons/checkmark.svg';
import { i18Namespace, Profile } from '@/shared/config';
import { Text } from '@/shared/ui/Text';

import styles from './UserVerified.module.css';

export const UserVerified = () => {
	const { t } = useTranslation(i18Namespace.profile);

	return (
		<>
			<div className={styles.wrapper}>
				<Checkmark className={styles.svg} />
				<Text variant="head3">{t(Profile.EMAIL_VERIFICATION_SUCCESS_VERIFY_STUB_TITLE)}</Text>
			</div>
			<Text variant="body3" className={styles['card-text']}>
				{t(Profile.EMAIL_VERIFICATION_SUCCESS_VERIFY_STUB_DESCRIPTION)}
			</Text>
		</>
	);
};
