import { TelegramUser } from '@/entities/auth';

import { TelegramWidget } from '../../../login/ui/TelegramLoginButton/ui/TelegramWidget/TelegramWidget';
import { useLinkTelegramAccountMutation } from '../../api/telegramLinkApi';

export const TelegramLinkButton = () => {
	const [triggerTelegram] = useLinkTelegramAccountMutation();

	const onTelegramAuth = async (user: TelegramUser) => {
		await triggerTelegram(user);
	};

	return <TelegramWidget onTelegramAuth={onTelegramAuth} />;
};
