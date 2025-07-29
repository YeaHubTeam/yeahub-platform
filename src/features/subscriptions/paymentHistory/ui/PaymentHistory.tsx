import { useMemo, useState } from 'react';

import { useAppSelector } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Loader } from '@/shared/ui/Loader';
import { PaymentHistoryList } from '@/shared/ui/PaymentHistoryList';

import { useGetPaymentsHistoryQuery } from '@/entities/payment';

import styles from './PaymentHistory.module.css';

export const PaymentHistory = () => {
	const [pageNumber, setPageNumber] = useState(1);
	const userId = useAppSelector((state) => state.profile.fullProfile?.id || '');

	const queryParams = useMemo(
		() => ({
			id: userId,
			params: { page: pageNumber },
		}),
		[userId, pageNumber],
	);

	const { data: payHistories, isLoading, error } = useGetPaymentsHistoryQuery(queryParams);

	if (isLoading) {
		return (
			<Card className={styles.wrapper}>
				<Loader />
			</Card>
		);
	}

	if (error) {
		return null;
	}

	const payments = payHistories?.data || [];
	const totalPages =
		payHistories?.total && payHistories?.limit
			? Math.ceil(payHistories.total / payHistories.limit)
			: 0;

	return (
		<Card className={styles.wrapper}>
			<PaymentHistoryList
				payments={payments}
				page={pageNumber}
				totalPages={totalPages}
				onPageChange={setPageNumber}
			/>
		</Card>
	);
};
