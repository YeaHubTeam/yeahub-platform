import { useTranslation } from 'react-i18next';

import Checkmark from '@/shared/assets/icons/Checkmark.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';

import { getFullProfile } from '@/entities/profile';

import { useSendVerificationEmailMutation } from '../api/confirmEmailApi';

import styles from './ConfirmationEmail.module.css';

interface ConfirmationEmailProps {
	email: string;
	isLetterSent: boolean;
}

export const ConfirmationEmail = ({ email, isLetterSent }: ConfirmationEmailProps) => {
	const { t } = useTranslation(i18Namespace.profile);
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
				<Text variant="head3">{t(Profile.EMAIL_VERIFICATION_TITLE)}</Text>
				<Text variant="body3">{t(Profile.EMAIL_VERIFICATION_DESCRIPTION)}</Text>
				{isLetterSent && (
					<Text variant="body3" className={styles['spam-message']}>
						{t(Profile.EMAIL_VERIFICATION_SPAM_MESSAGE)}
					</Text>
				)}
			</Flex>

			<p className={styles['card-email']}>{t(Profile.EMAIL_VERIFICATION_EMAIL)}</p>

			<div className={styles.card}>
				<Input placeholder="E-mail" value={email} disabled className={styles.input} />

				{isLetterSent ? (
					<Flex align="center" className={styles.flex}>
						<Checkmark className={styles.svg} />
						<p className={styles['card-text-email']}>
							{t(Profile.EMAIL_VERIFICATION_SENT_SUCCESS)}
						</p>
					</Flex>
				) : (
					<Button
						variant="primary"
						onClick={onClickVerificationButton}
						disabled={isSendingVerificationEmail}
						className={styles.button}
					>
						{t(Profile.EMAIL_VERIFICATION_SUBMIT)}
					</Button>
				)}
			</div>
		</>
	);
};
