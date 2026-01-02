import { useAppSelector } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';

import { getFullProfile } from '@/entities/profile';

import { ConfirmationTelegram } from '../ConfirmationTelegram/ConfirmationTelegram';
import { EmailVerification } from '../EmailVerification/EmailVerification';
import { TelegramVerifiedSection } from '../TelegramVerifiedSection/TelegramVerifiedSection';

export const EmailConfirmationTab = () => {
	const { telegramUsername } = useAppSelector(getFullProfile);

	return (
		<Flex direction="column" gap="20">
			<EmailVerification />
			{telegramUsername ? <TelegramVerifiedSection /> : <ConfirmationTelegram />}
		</Flex>
	);
};
