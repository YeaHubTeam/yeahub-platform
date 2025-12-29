import { Flex } from '@/shared/ui/Flex';

import { PayHistoryList } from '@/widgets/PayHistoryList';

import { ActiveSubscriptionInfo } from '../../ActiveSubscriptionInfo/ActiveSubscriptionInfo';

export const PremiumSubscriptionTab = () => {
	return (
		<Flex direction="column" gap="20">
			<ActiveSubscriptionInfo />
			<PayHistoryList />
		</Flex>
	);
};
