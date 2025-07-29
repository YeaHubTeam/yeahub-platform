import { Flex } from '@/shared/ui/Flex';

import { FaqList } from '@/features/subscriptions/faq';
import { AgreementForm } from '@/features/subscriptions/subscribe';

export const FreeSubscriptionTab = () => {
	return (
		<Flex direction="column" gap="20">
			<AgreementForm />
			<FaqList />
		</Flex>
	);
};
