import { useState } from 'react';
import { Input, Button } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import styles from './UserVerifySending.module.css';

interface UserVerifySendingProps {
	upperCaseFirstLetter: string;
	isEmailVerified: boolean;
	emailVerificationToken: string | null;
	email: string;
}

export const UserVerifySending = ({ upperCaseFirstLetter, email }: UserVerifySendingProps) => {
	const { t } = useI18nHelpers(i18Namespace.profile);

	// const { refetch } = useProfileQuery();
	// const [verifyEmail] = useVerifyEmailMutation();

	// const handleVerifyEmail = async () => {
	// 	if (!isEmailVerified && emailVerificationToken) {
	// 		try {
	// 			await verifyEmail({ token: emailVerificationToken });
	// 			refetch();
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	}
	// };

	const [mail, setMail] = useState(email || '');

	return (
		<>
			<div className={styles.wrapper}>
				<h3 className={styles['card-title']}>{upperCaseFirstLetter}</h3>
				<p className={styles['card-text']}>{t(Profile.PROFILE_EMAIL_VERIFICATION_TEXT)}</p>
			</div>
			<p className={styles['card-email']}>Введите e-mail</p>
			<div className={styles['card-input-wrapper']}>
				<Input placeholder="E-mail" value={mail} onChange={(e) => setMail(e.target.value)} />
				<Button className={styles.button} theme="primary" onClick={() => {}}>
					{t(Profile.PROFILE_EMAIL_VERIFICATION_BUTTON)}
				</Button>
			</div>
		</>
	);
};
