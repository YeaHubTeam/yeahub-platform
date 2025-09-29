import { Flex } from '@/shared/ui/Flex';

import { EmailVerification } from '@/widgets/EmailVerification';
import { TelegramVerification } from '@/widgets/TelegramVerification';

export const EmailConfirmationTab = () => {
	return (
		<Flex direction="column" gap="32">
			<EmailVerification />
			<TelegramVerification />
		</Flex>
	);
};
