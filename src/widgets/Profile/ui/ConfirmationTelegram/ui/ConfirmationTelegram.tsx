import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';

import { TelegramLinkButton } from '@/features/authentication/login';

import styles from './ConfirmationTelegram.module.css';

export const ConfirmationTelegram = () => {
	const { t } = useTranslation(i18Namespace.profile);

	return (
		<>
			<Flex direction="column" gap="12">
				<h3 className={styles['card-title']}>{t(Profile.TELEGRAM_VERIFICATION_TITLE)}</h3>
				<p className={styles['card-text']}>{t(Profile.TELEGRAM_VERIFICATION_DESCRIPTION)}</p>

				{/* TODO: Кастомная реализация кнопки для телеграм */}
				{/*<Button variant="primary" onClick={onClickVerificationButton} className={styles.button}>*/}
				{/*	{t(Profile.TELEGRAM_VERIFICATION_SUBMIT)}*/}
				{/*</Button>*/}
				<TelegramLinkButton />
			</Flex>
		</>
	);
};
