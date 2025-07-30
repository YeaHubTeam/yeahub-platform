import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import Checkmark from '@/shared/assets/icons/Checkmark.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Input } from '@/shared/ui/Input';

import { getFullProfile } from '@/entities/profile';

import { useSendVerificationEmailMutation } from '../api/confirmEmailApi';

import styles from './ConfirmationEmail.module.css';

interface ConfirmationEmailProps {
	email: string;
	isLetterSended: boolean;
}

export const ConfirmationEmail = ({ email, isLetterSended }: ConfirmationEmailProps) => {
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
				<h3 className={styles['card-title']}>{t(Profile.EMAIL_VERIFICATION_TITLE)}</h3>
				<p className={styles['card-text']}>{t(Profile.EMAIL_VERIFICATION_DESCRIPTION)}</p>
				{isLetterSended && (
					<p className={classNames(styles['card-text'], styles['spam-message'])}>
						{t(Profile.EMAIL_VERIFICATION_SPAM_MESSAGE)}
					</p>
				)}
			</Flex>

			<p className={styles['card-email']}>{t(Profile.EMAIL_VERIFICATION_EMAIL)}</p>

			<div className={styles.card}>
				<Input placeholder="E-mail" value={email} disabled className={styles.input} />

				{isLetterSended ? (
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
