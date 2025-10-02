import { useTelegramMutation, TelegramUser } from '@/entities/auth';
import { TelegramWidget } from '@/entities/auth';

export const TelegramLoginButton = () => {
	const [triggerTelegram] = useTelegramMutation();

	const onTelegramAuth = async (user: TelegramUser) => {
		await triggerTelegram(user);
	};

	return <TelegramWidget onTelegramAuth={onTelegramAuth} />;
};
