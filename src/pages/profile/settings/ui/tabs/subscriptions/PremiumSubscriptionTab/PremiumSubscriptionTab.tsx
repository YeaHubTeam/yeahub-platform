import { Flex } from '@/shared/ui/Flex';

import { ActiveSubscriptionInfo } from '../ActiveSubscriptionInfo/ActiveSubscriptionInfo';
import { PayHistoryList } from '../PayHistoryList/PayHistoryList';

export const PremiumSubscriptionTab = () => {
	return (
		<Flex direction="column" gap="20">
			<ActiveSubscriptionInfo />
			<PayHistoryList />
		</Flex>
	);
};
