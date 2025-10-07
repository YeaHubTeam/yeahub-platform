import { useAppSelector } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';

import { getFullProfile } from '@/entities/profile';

import { ConfirmationTelegram } from '@/widgets/ConfirmationTelegram';
import { EmailVerification } from '@/widgets/EmailVerification';
import { TelegramVerifiedSection } from '@/widgets/TelegramVerifiedSection';

export const EmailConfirmationTab = () => {
	const { telegram: telegramUserName } = useAppSelector(getFullProfile);

	return (
		<Flex direction="column" gap="20">
			<EmailVerification />
			{telegramUserName ? <TelegramVerifiedSection /> : <ConfirmationTelegram />}
		</Flex>
	);
};
