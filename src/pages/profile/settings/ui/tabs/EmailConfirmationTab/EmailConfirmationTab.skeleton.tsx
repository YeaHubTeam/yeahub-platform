import { Flex } from '@/shared/ui/Flex';

import { ConfirmationTelegramSkeleton } from '@/widgets/ConfirmationTelegram';
import { EmailVerificationSkeleton } from '@/widgets/EmailVerification';

export const EmailConfirmationTabSkeleton = () => {
	return (
		<Flex direction="column" gap="20">
			<EmailVerificationSkeleton />
			<ConfirmationTelegramSkeleton />
		</Flex>
	);
};
