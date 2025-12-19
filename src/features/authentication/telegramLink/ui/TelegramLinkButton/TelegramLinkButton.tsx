import { TelegramUser, TelegramWidget } from '@/entities/auth';

import { useLinkTelegramAccountMutation } from '../../api/telegramLinkApi';

export const TelegramLinkButton = () => {
	const [triggerTelegram] = useLinkTelegramAccountMutation();

	const onTelegramAuth = async (user: TelegramUser) => {
		await triggerTelegram(user);
	};

	return <TelegramWidget onTelegramAuth={onTelegramAuth} />;
};
