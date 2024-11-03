import { Button, Input } from 'yeahub-ui-kit';

import Checkmark from '@/shared/assets/icons/Checkmark.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import styles from './EmailFormValidation.module.css';

interface EmailFormValidationProps {
	email: string;
	upperCaseFirstLetter: string;
	isLetterSended: boolean;
}

export const EmailFormValidation = ({
	email,
	upperCaseFirstLetter,
	isLetterSended,
}: EmailFormValidationProps) => {
	const { t } = useI18nHelpers(i18Namespace.profile);

	return (
		<>
			<div className={styles.wrapper}>
				<h3 className={styles['card-title']}>{upperCaseFirstLetter}</h3>
				<p className={styles['card-text']}>{t(Profile.PROFILE_EMAIL_VERIFICATION_TEXT)}</p>
			</div>

			<p className={styles['card-email']}>{t(Profile.PROFILE_EMAIL_VERIFICATION_WRITE_EMAIL)}</p>
			{isLetterSended ? (
				<div className={styles.card}>
					<Input placeholder="E-mail" value={email} disabled className={styles.input} />
					<div className={styles['card-content']}>
						{isLetterSended ? (
							<>
								<Checkmark className={styles.svg} />
								<p className={styles['card-text-email']}>
									{t(Profile.PROFILE_EMAIL_VERIFICATION_LETTER_SENT)}
								</p>
							</>
						) : (
							<>
								<Input placeholder="E-mail" disabled value={email} className={styles.input} />
								<Button theme="primary" onClick={() => {}}>
									{t(Profile.PROFILE_EMAIL_VERIFICATION_BUTTON)}
								</Button>
							</>
						)}
					</div>
				</div>
			) : (
				<div className={styles['card-input-wrapper']}>
					<Input placeholder="E-mail" disabled value={email} className={styles.input} />
					<Button theme="primary" onClick={() => {}}>
						{t(Profile.PROFILE_EMAIL_VERIFICATION_BUTTON)}
					</Button>
				</div>
			)}
		</>
	);
};
