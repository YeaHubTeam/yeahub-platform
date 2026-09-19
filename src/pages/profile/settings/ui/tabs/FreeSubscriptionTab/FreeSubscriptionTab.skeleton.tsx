import { Flex } from '@/shared/ui/Flex';

import { FaqListSkeleton } from '@/widgets/FaqList';
import { SubscriptionsListSkeleton } from '@/widgets/SubscriptionsList';

export const FreeSubscriptionTabSkeleton = () => {
	return (
		<Flex direction="column" gap="20">
			<SubscriptionsListSkeleton />
			<FaqListSkeleton />
		</Flex>
	);
};
