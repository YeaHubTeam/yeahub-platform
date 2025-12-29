import { useTranslation } from 'react-i18next';

import { i18Namespace, Auth } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { TelegramLoginButton } from '../TelegramLoginButton/TelegramLoginButton';

export const TelegramLogin = () => {
	const { t } = useTranslation(i18Namespace.auth);

	return (
		<Flex direction="column" gap="8" align="center">
			<Text variant="body2">{t(Auth.REGISTRATION_SOCIAL_MEDIA)}</Text>
			<TelegramLoginButton />
		</Flex>
	);
};
