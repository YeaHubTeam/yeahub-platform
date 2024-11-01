import { Input } from 'yeahub-ui-kit';

import Checkmark from '@/shared/assets/icons/Checkmark.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import styles from './UserVerifyWaiting.module.css';

interface MessageSendedProps {
	upperCaseFirstLetter: string;
	email: string;
}

export const UserVerifyWaiting = ({ upperCaseFirstLetter, email }: MessageSendedProps) => {
	const { t } = useI18nHelpers(i18Namespace.profile);

	return (
		<>
			<div className={styles.wrapper}>
				<h3 className={styles['card-title']}>{upperCaseFirstLetter}</h3>
				<p>{t(Profile.PROFILE_EMAIL_VERIFICATION_TEXT)}</p>
			</div>
			<p className={styles['card-email']}>Введите e-mail</p>
			<div className={styles.card}>
				<Input placeholder="E-mail" value={email} disabled />
				<div className={styles['card-content']}>
					<Checkmark className={styles.svg} />
					<h5 className={styles['card-text']}>
						{t(Profile.PROFILE_EMAIL_VERIFICATION_LETTER_SENT)}
					</h5>
				</div>
			</div>
		</>
	);
};
