import { Flex } from '@/shared/ui/Flex';

import { ConfirmationTelegram } from '@/widgets/ConfirmationTelegram';
import { EmailVerification } from '@/widgets/EmailVerification';

export const EmailConfirmationTab = () => {
	return (
		<Flex direction="column" gap="20">
			<EmailVerification />
			<ConfirmationTelegram />
		</Flex>
	);
};
