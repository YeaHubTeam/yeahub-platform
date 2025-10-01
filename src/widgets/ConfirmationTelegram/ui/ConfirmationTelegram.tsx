import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { TelegramLinkButton } from '@/features/authentication/login';

export const ConfirmationTelegram = () => {
	const { t } = useTranslation(i18Namespace.profile);

	return (
		<>
			<Card>
				<Flex direction="column" gap="12">
					<Text variant="head3">{t(Profile.TELEGRAM_VERIFICATION_TITLE)}</Text>
					<Text variant="body3">{t(Profile.TELEGRAM_VERIFICATION_DESCRIPTION)}</Text>

					{/* TODO: Кастомная реализация кнопки для телеграм */}
					{/*<Button variant="primary" onClick={onClickVerificationButton} className={styles.button}>*/}
					{/*	{t(Profile.TELEGRAM_VERIFICATION_SUBMIT)}*/}
					{/*</Button>*/}
					<TelegramLinkButton />
				</Flex>
			</Card>
		</>
	);
};
