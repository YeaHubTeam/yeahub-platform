import { useMemo, useState } from 'react';

import { useAppSelector } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';

import { useGetPaymentsHistoryQuery } from '@/entities/payment';

import { PayHistoryList } from '@/widgets/Profile';
import { ActiveSubscriptionInfo } from '@/widgets/Subscription';

export const PremiumSubscriptionTab = () => {
	const [pageNumber, setPageNumber] = useState(1);
	const userId = useAppSelector((state) => state.profile.fullProfile?.id || '');

	const queryParams = useMemo(
		() => ({
			id: userId,
			params: { page: pageNumber },
		}),
		[userId, pageNumber],
	);

	const { data: payHistories } = useGetPaymentsHistoryQuery(queryParams);

	const payments = payHistories?.data || [];
	const totalPages =
		payHistories?.total && payHistories?.limit
			? Math.ceil(payHistories.total / payHistories.limit)
			: 0;

	return (
		<Flex direction="column" gap="20">
			<ActiveSubscriptionInfo />
			<PayHistoryList
				payments={payments}
				page={pageNumber}
				totalPages={totalPages}
				onPageChange={setPageNumber}
			/>
		</Flex>
	);
};
