import { Button } from 'yeahub-ui-kit';

import Checkmark from '@/shared/assets/icons/Checkmark.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Flex } from '@/shared/ui/Flex';
import { Input } from '@/shared/ui/Input';

import { getFullProfile } from '@/entities/profile';

import { useSendVerificationEmailMutation } from '../api/confirmEmailApi';

import styles from './ConfirmationEmail.module.css';

interface ConfirmationEmailProps {
	email: string;
	upperCaseFirstLetter: string;
	isLetterSended: boolean;
}

export const ConfirmationEmail = ({
	email,
	upperCaseFirstLetter,
	isLetterSended,
}: ConfirmationEmailProps) => {
	const { t } = useI18nHelpers(i18Namespace.profile);
	const profile = useAppSelector(getFullProfile);
	const userId = profile?.id;

	const [sendVerificationEmail, { isLoading: isSendingVerificationEmail }] =
		useSendVerificationEmailMutation();

	const onClickVerificationButton = () => {
		if (userId) {
			sendVerificationEmail({ id: userId });
		}
	};

	return (
		<>
			<Flex direction="column" gap="12">
				<h3 className={styles['card-title']}>{upperCaseFirstLetter}</h3>
				<p className={styles['card-text']}>{t(Profile.PROFILE_EMAIL_VERIFICATION_TEXT)}</p>
			</Flex>

			<p className={styles['card-email']}>{t(Profile.PROFILE_EMAIL_VERIFICATION_WRITE_EMAIL)}</p>

			<div className={styles.card}>
				<Input placeholder="E-mail" value={email} disabled className={styles.input} />

				{isLetterSended ? (
					<Flex align="center" className={styles.flex}>
						<Checkmark className={styles.svg} />
						<p className={styles['card-text-email']}>
							{t(Profile.PROFILE_EMAIL_VERIFICATION_LETTER_SENT)}
						</p>
					</Flex>
				) : (
					<Button
						theme="primary"
						onClick={onClickVerificationButton}
						disabled={isSendingVerificationEmail}
					>
						{t(Profile.PROFILE_EMAIL_VERIFICATION_BUTTON)}
					</Button>
				)}
			</div>
		</>
	);
};
