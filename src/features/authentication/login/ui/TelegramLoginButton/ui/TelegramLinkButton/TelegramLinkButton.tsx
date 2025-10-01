import { TelegramUser } from '@/entities/auth';

import { useLinkTelegramAccountMutation } from '@/features/authentication/telegramLink';

import { TelegramWidget } from '../TelegramWidget/TelegramWidget';

export const TelegramLinkButton = () => {
	const [triggerTelegram] = useLinkTelegramAccountMutation();

	const onTelegramAuth = async (user: TelegramUser) => {
		await triggerTelegram(user);
	};

	return <TelegramWidget onTelegramAuth={onTelegramAuth} />;
};
