import { Flex } from '@/shared/ui/Flex';

import { PayHistoryList } from '@/widgets/PayHistoryList';
import { ActiveSubscriptionInfo } from '@/widgets/Subscription';

export const PremiumSubscriptionTab = () => {
	return (
		<Flex direction="column" gap="20">
			<ActiveSubscriptionInfo />
			<PayHistoryList />
		</Flex>
	);
};
